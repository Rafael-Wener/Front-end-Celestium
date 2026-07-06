'use client';

import { Pedido } from '../hooks/useAdminData';

interface AdminHistoricoProps {
  orders: Pedido[];
}

export default function AdminHistorico({ orders }: AdminHistoricoProps) {
  return (
    <section className="space-y-6 rounded border border-white/10 bg-[#09060f]/90 p-6 shadow-2xl shadow-black/50">
      <div>
        <h3 className="text-2xl font-bold text-white">Histórico</h3>
        <p className="mt-2 text-sm text-slate-400">Relatório completo de pedidos finalizados e pendentes.</p>
      </div>

      <div className="overflow-hidden rounded border border-white/10 bg-black/60">
        <div className="grid grid-cols-5 gap-4 bg-white/5 px-5 py-4 text-xs uppercase tracking-[0.35em] text-slate-400">
          <span>ID</span>
          <span>Cliente</span>
          <span>Status</span>
          <span>Data</span>
          <span className="text-right">Total</span>
        </div>
        <div className="divide-y divide-white/10 bg-[#05030a]">
          {orders.map((pedido) => (
            <div key={pedido.id} className="grid grid-cols-5 gap-4 px-5 py-4 text-sm text-slate-200">
              <span>{pedido.id}</span>
              <span>{pedido.cliente}</span>
              <span
                className={
                  pedido.status === 'Pago'
                    ? 'text-emerald-400'
                    : pedido.status === 'Entregue'
                    ? 'text-slate-300'
                    : 'text-amber-300'
                }
              >
                {pedido.status}
              </span>
              <span>{pedido.createdAt}</span>
              <span className="text-right">R$ {pedido.total.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
