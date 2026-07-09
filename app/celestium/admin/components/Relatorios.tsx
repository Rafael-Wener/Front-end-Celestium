"use client";

import { useEffect, useState } from "react";

interface ItemPedido {
  price: number;
  quantity: number;
}

interface Pedido {
  id: string;
  items: ItemPedido[];
  status: string | { name: string };
  createdAt: string;
}

export default function Financeiros() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Métricas calculadas
  const [faturamentoTotal, setFaturamentoTotal] = useState(0);
  const [faturamentoMensal, setFaturamentoMensal] = useState(0);
  const [pedidosAprovados, setPedidosAprovados] = useState(0);
  const [ticketMedio, setTicketMedio] = useState(0);

  async function carregarDadosFinanceiros() {
    const token = localStorage.getItem("token");
    try {
      setCarregando(true);
      const res = await fetch("http://localhost:3005/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error();
      const data: Pedido[] = await res.json();
      setPedidos(data);
      calcularMetricas(data);
    } catch {
      setErro("Não foi possível carregar as informações financeiras.");
    } finally {
      setCarregando(false);
    }
  }

  function normalizarStatus(statusInput: Pedido["status"]): string {
    if (typeof statusInput === "object" && statusInput !== null) {
      return (statusInput as any).name || "PENDING";
    }
    return String(statusInput || "PENDING");
  }

  function calcularMetricas(listaPedidos: Pedido[]) {
    let totalGeral = 0;
    let totalMesAtual = 0;
    let qtdAprovados = 0;

    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth();
    const anoAtual = dataAtual.getFullYear();

    listaPedidos.forEach((pedido) => {
      const status = normalizarStatus(pedido.status);
      
      // Apenas pedidos aprovados entram para o financeiro de dinheiro real
      if (status === "APPROVED" || status === "APROVADO") {
        qtdAprovados++;
        
        // Calcula o valor total deste pedido somando seus itens
        const valorPedido = (pedido.items || []).reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );

        totalGeral += valorPedido;

        // Verifica se o pedido é do mês corrente
        const dataPedido = new Date(pedido.createdAt);
        if (dataPedido.getMonth() === mesAtual && dataPedido.getFullYear() === anoAtual) {
          totalMesAtual += valorPedido;
        }
      }
    });

    setFaturamentoTotal(totalGeral);
    setFaturamentoMensal(totalMesAtual);
    setPedidosAprovados(qtdAprovados);
    setTicketMedio(qtdAprovados > 0 ? totalGeral / qtdAprovados : 0);
  }

  useEffect(() => {
    carregarDadosFinanceiros();
  }, []);

  if (carregando) {
    return (
      <div className="p-12 text-center text-sm text-neutral-400 animate-pulse bg-[#0a0516] min-h-screen">
        Processando livros caixas do Celestium...
      </div>
    );
  }

  if (erro) {
    return (
      <div className="p-12 text-center text-sm text-red-400 bg-[#0a0516] min-h-screen">
        <div className="border border-red-500/10 bg-red-500/5 p-4 rounded-xl max-w-md mx-auto">{erro}</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-[#0a0516] text-white min-h-screen p-1">
      
      {/* CABEÇALHO */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400">// DASHBOARD</span>
        <h2 className="text-2xl font-bold mt-1 text-white">Relatórios & Finanças</h2>
        <p className="text-sm text-neutral-400 mt-1">Visão geral sobre faturamento bruto, vendas convertidas e saúde financeira da loja.</p>
      </div>

      {/* BLOCOS DE MÉTRICAS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Card 1: Total Bruto */}
        <div className="rounded-xl border border-purple-950/50 bg-[#130d24]/40 p-6 shadow-md relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition-all duration-300" />
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Faturamento Total</span>
          <div className="text-2xl font-black text-green-400 mt-2">R$ {faturamentoTotal.toFixed(2)}</div>
          <p className="text-[10px] text-neutral-500 mt-1">Todo o período histórico</p>
        </div>

        {/* Card 2: Faturamento Mensal */}
        <div className="rounded-xl border border-purple-950/50 bg-[#130d24]/40 p-6 shadow-md relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-all duration-300" />
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Este Mês</span>
          <div className="text-2xl font-black text-white mt-2">R$ {faturamentoMensal.toFixed(2)}</div>
          <p className="text-[10px] text-purple-400 font-semibold mt-1">Baseado no mês atual</p>
        </div>

        {/* Card 3: Ticket Médio */}
        <div className="rounded-xl border border-purple-950/50 bg-[#130d24]/40 p-6 shadow-md relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-all duration-300" />
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Ticket Médio</span>
          <div className="text-2xl font-black text-amber-400 mt-2">R$ {ticketMedio.toFixed(2)}</div>
          <p className="text-[10px] text-neutral-500 mt-1">Média gasta por transação</p>
        </div>

        {/* Card 4: Conversão / Vendas */}
        <div className="rounded-xl border border-purple-950/50 bg-[#130d24]/40 p-6 shadow-md relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-all duration-300" />
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Vendas Aprovadas</span>
          <div className="text-2xl font-black text-white mt-2">{pedidosAprovados} <span className="text-xs font-medium text-neutral-400">pedidos</span></div>
          <p className="text-[10px] text-neutral-500 mt-1">Ignorando pendentes/cancelados</p>
        </div>

      </div>

      {/* DETALHAMENTO ADICIONAL */}
      <div className="rounded-xl border border-purple-950/40 bg-[#130d24]/20 p-6">
        <h3 className="text-lg font-bold text-white mb-2">Análise de Fluxo</h3>
        <p className="text-sm text-neutral-400 mb-6">Resumo operacional rápido das movimentações da loja.</p>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-purple-950/20 pb-3">
            <span className="text-sm text-neutral-400">Total de Pedidos Gerados (Todos os status)</span>
            <span className="font-mono text-sm text-neutral-200">{pedidos.length}</span>
          </div>
          <div className="flex justify-between items-center border-b border-purple-950/20 pb-3">
            <span className="text-sm text-neutral-400">Pedidos aguardando pagamento / cancelados</span>
            <span className="font-mono text-sm text-red-400">{pedidos.length - pedidosAprovados}</span>
          </div>
          <div className="flex justify-between items-center pb-1">
            <span className="text-sm text-neutral-400">Taxa de Conversão de Carrinho</span>
            <span className="font-mono text-sm text-purple-400 font-bold">
              {pedidos.length > 0 ? ((pedidosAprovados / pedidos.length) * 100).toFixed(1) : 0}%
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}