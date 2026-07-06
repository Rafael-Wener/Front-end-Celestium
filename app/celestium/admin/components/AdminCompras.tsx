'use client';

import { Pedido } from '../hooks/useAdminData';

interface AdminComprasProps {
  orders: Pedido[];
}

export default function AdminCompras({ orders }: AdminComprasProps) {
  return (
    <section className="space-y-6 rounded border border-white/10 bg-[#09060f]/90 p-6 shadow-2xl shadow-black/50">
      <div>
        <h3 className="text-2xl font-bold text-white">Compras</h3>
        <p className="mt-2 text-sm text-slate-400">Veja os pedidos recentes e o status de cada compra.</p>
      </div>

      <div className="space-y-4">
        {orders.map((pedido) => (
          <div key={pedido.id} className="rounded border border-white/10 bg-black/60 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Pedido {pedido.id}</p>
                <p className="mt-2 text-lg font-bold text-white">{pedido.cliente}</p>
              </div>
              <div className="flex flex-col gap-1 text-right">
                <span className="text-sm text-slate-400">{pedido.createdAt}</span>
                <span className="rounded bg-purple-600/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-purple-200">{pedido.status}</span>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Itens</p>
                <p className="mt-2 text-sm text-slate-200">{pedido.items.length} item(s)</p>
              </div>
              <div className="rounded bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Total</p>
                <p className="mt-2 text-2xl font-bold text-white">R$ {pedido.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
