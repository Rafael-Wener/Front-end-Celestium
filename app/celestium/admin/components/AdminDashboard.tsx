'use client';

interface AdminDashboardProps {
  totalProdutos: number;
  totalPedidos: number;
}

export default function AdminDashboard({ totalProdutos, totalPedidos }: AdminDashboardProps) {
  return (
    <section className="rounded border border-white/10 bg-[#09060f]/90 p-6 shadow-2xl shadow-black/50">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Visão geral</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Dashboard</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Produtos</p>
            <p className="mt-3 text-3xl font-bold text-white">{totalProdutos}</p>
          </div>
          <div className="rounded bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Pedidos</p>
            <p className="mt-3 text-3xl font-bold text-white">{totalPedidos}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
