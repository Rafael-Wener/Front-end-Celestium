'use client';

import { Pedido } from '../hooks/useAdminData';

interface AdminRelatoriosProps {
  totalRevenue: number;
  pendingOrders: number;
  deliveredOrders: number;
  produtosDisponiveis: number;
}

export default function AdminRelatorios({
  totalRevenue,
  pendingOrders,
  deliveredOrders,
  produtosDisponiveis,
}: AdminRelatoriosProps) {
  return (
    <section className="space-y-6 rounded border border-white/10 bg-[#09060f]/90 p-6 shadow-2xl shadow-black/50">
      <div>
        <h3 className="text-2xl font-bold text-white">Relatórios</h3>
        <p className="mt-2 text-sm text-slate-400">Resultados agregados das vendas e pedidos.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded bg-black/60 p-5">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Receita</p>
          <p className="mt-3 text-3xl font-bold text-white">R$ {totalRevenue.toFixed(2)}</p>
        </div>
        <div className="rounded bg-black/60 p-5">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Pedidos pendentes</p>
          <p className="mt-3 text-3xl font-bold text-white">{pendingOrders}</p>
        </div>
        <div className="rounded bg-black/60 p-5">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Pedidos entregues</p>
          <p className="mt-3 text-3xl font-bold text-white">{deliveredOrders}</p>
        </div>
        <div className="rounded bg-black/60 p-5">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Produtos ativos</p>
          <p className="mt-3 text-3xl font-bold text-white">{produtosDisponiveis}</p>
        </div>
      </div>
    </section>
  );
}
