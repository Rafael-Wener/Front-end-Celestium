"use client";

import { useEffect, useState } from "react";

// Definição da interface alinhada perfeitamente com o retorno do seu Backend
interface ItemPedido {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface Pedido {
  id: string;
  user: {
    name: string;
    email: string;
  } | null;
  items: ItemPedido[];
  paymentMethod?: string;
  status: string | { name: string }; // Aceita string ou o objeto vindo do banco
  createdAt: string;
}

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  
  const [buscaNick, setBuscaNick] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("TODOS");

  async function carregarHistorico() {
    const token = localStorage.getItem("token");
    try {
      setCarregando(true);
      const res = await fetch("http://localhost:3005/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      setPedidos(data);
    } catch {
      setErro("Não foi possível carregar o histórico de transações.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarHistorico();
  }, []);

  // Normaliza o status para string pura para facilitar verificações no Front
  function normalizarStatus(statusInput: Pedido["status"]): string {
    if (typeof statusInput === "object" && statusInput !== null) {
      return (statusInput as any).name || "PENDING";
    }
    return String(statusInput || "PENDING");
  }

  // Filtro corrigido buscando dentro do relacionamento correto
  const pedidosFiltrados = pedidos.filter((pedido) => {
    const nickJogador = pedido.user?.name || "";
    const statusAtual = normalizarStatus(pedido.status);

    const bateNick = nickJogador.toLowerCase().includes(buscaNick.toLowerCase());
    const bateStatus = filtroStatus === "TODOS" || statusAtual === filtroStatus;
    return bateNick && bateStatus;
  });

  // Retorna a cor da Badge baseado no texto do status
  function obterBadgeStatus(statusInput: Pedido["status"]) {
    const status = normalizarStatus(statusInput);
    switch (status) {
      case "APPROVED":
      case "APROVADO":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "PENDING":
      case "PENDENTE":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "CANCELLED":
      case "CANCELADO":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    }
  }

  // Texto amigável da Badge
  function obterTextoStatus(statusInput: Pedido["status"]) {
    const status = normalizarStatus(statusInput);
    if (status === "APPROVED" || status === "APROVADO") return "Aprovado";
    if (status === "CANCELLED" || status === "CANCELADO") return "Cancelado";
    return "Pendente";
  }

  return (
    <div className="space-y-6 bg-[#0a0516] text-white min-h-screen p-1">
      
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400">// FINANCEIRO</span>
        <h2 className="text-2xl font-bold mt-1 text-white">Histórico de Vendas</h2>
        <p className="text-sm text-neutral-400 mt-1">Acompanhe todos os pacotes e moedas adquiridos pelos jogadores na loja Celestium.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_200px] gap-4 bg-[#130d24]/40 border border-purple-950/40 p-4 rounded-xl">
        <input
          type="text"
          placeholder="Buscar por Nick do Jogador..."
          value={buscaNick}
          onChange={(e) => setBuscaNick(e.target.value)}
          className="rounded-md border border-purple-950/60 bg-[#0c061a] px-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none focus:border-purple-500"
        />

        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
          className="rounded-md border border-purple-950/60 bg-[#0c061a] px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500 cursor-pointer"
        >
          <option value="TODOS">Todos os Status</option>
          <option value="APPROVED">Aprovados</option>
          <option value="PENDING">Pendentes</option>
          <option value="CANCELLED">Cancelados</option>
        </select>
      </div>

      <div className="rounded-xl border border-purple-950/40 bg-[#130d24]/20 shadow-xl overflow-hidden">
        {carregando ? (
          <div className="p-12 text-center text-sm text-neutral-400 animate-pulse">Buscando transações do banco de dados...</div>
        ) : erro ? (
          <div className="p-12 text-center text-sm text-red-400 border border-red-500/10 bg-red-500/5">{erro}</div>
        ) : pedidosFiltrados.length === 0 ? (
          <div className="p-12 text-center text-sm text-neutral-500">Nenhum registro de venda encontrado para os filtros aplicados.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-purple-950/60 bg-[#0c061a] text-xs font-bold uppercase tracking-wider text-neutral-400">
                  <th className="py-4 px-6">Jogador (Nick)</th>
                  <th className="py-4 px-6">Produto Adquirido</th>
                  <th className="py-4 px-6">Data / Hora</th>
                  <th className="py-4 px-6">Pagamento</th>
                  <th className="py-4 px-6">Valor Total</th>
                  <th className="py-4 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-950/30 text-sm">
                {pedidosFiltrados.map((pedido) => {
                  // Mapeia o nome do produto dinamicamente vindo do array "items"
                  const listaItens = pedido.items || [];
                  const primeiroItem = listaItens.length > 0 ? listaItens[0] : null;
                  
                  // Calcula o preço final somando o subtotal de cada item (price * quantity)
                  const valorTotalPedido = listaItens.reduce(
                    (acc, item) => acc + (item.price * item.quantity), 
                    0
                  );

                  return (
                    <tr key={pedido.id} className="transition-colors hover:bg-purple-950/10 group">
                      
                      {/* Jogador (Nick) */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-white group-hover:text-purple-300 transition-colors">
                          {pedido.user?.name || "Jogador Desconhecido"}
                        </div>
                        <div className="text-xs text-neutral-500 mt-0.5">{pedido.user?.email || "Sem e-mail"}</div>
                      </td>

                      {/* Produto vindo do array items */}
                      <td className="py-4 px-6 font-medium text-neutral-200">
                        {primeiroItem ? (
                          <div className="flex items-center gap-1.5">
                            <span>{primeiroItem.name}</span>
                            {primeiroItem.quantity > 1 && (
                              <span className="text-xs text-neutral-400 font-normal">({primeiroItem.quantity}x)</span>
                            )}
                            {listaItens.length > 1 && (
                              <span className="text-[10px] bg-purple-900/60 text-purple-300 border border-purple-500/20 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                                +{listaItens.length - 1} itens
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-neutral-600 italic">Nenhum item</span>
                        )}
                      </td>

                      {/* Data formatada */}
                      <td className="py-4 px-6 text-neutral-400 text-xs">
                        {pedido.createdAt ? new Date(pedido.createdAt).toLocaleString("pt-BR") : "Data indisponível"}
                      </td>

                      {/* Método de pagamento */}
                      <td className="py-4 px-6 text-xs font-bold font-mono tracking-wide text-purple-400/80">
                        {pedido.paymentMethod || "PIX"}
                      </td>

                      {/* Valor calculado em tempo real */}
                      <td className="py-4 px-6 font-semibold text-purple-400">
                        R$ {valorTotalPedido.toFixed(2)}
                      </td>

                      {/* Status adaptado */}
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-md border ${obterBadgeStatus(pedido.status)}`}>
                          {obterTextoStatus(pedido.status)}
                        </span>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}