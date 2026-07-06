'use client';

import { useState } from 'react';
import AdminHeader from './AdminHeader';
import AdminUserLabel from './AdminUserLabel';
import AdminSidebar from './AdminSidebar';
import AdminDashboard from './components/AdminDashboard';
import AdminCompras from './components/AdminCompras';
import AdminHistorico from './components/AdminHistorico';
import AdminRelatorios from './components/AdminRelatorios';
import AdminProdutos from './components/AdminProdutos';
import { useAdminData, Produto } from './hooks/useAdminData';

type SectionKey = 'produtos' | 'compras' | 'histórico' | 'relatórios';

export default function AdminPage() {
  const { user, produtos, orders, setProdutos } = useAdminData();
  const [selectedSection, setSelectedSection] = useState<SectionKey>('produtos');

  function handleLogout() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('nickname');
    window.location.href = '/login';
  }

  function handleAddProduto(produto: Omit<Produto, 'id'>) {
    const newProduto: Produto = {
      id: `produto-${Date.now()}`,
      ...produto,
      tag: produto.tag || null,
    };
    setProdutos((current) => [newProduto, ...current]);
  }

  function handleUpdateProduto(id: string, produto: Omit<Produto, 'id'>) {
    setProdutos((current) =>
      current.map((p) =>
        p.id === id ? { ...p, ...produto, tag: produto.tag || null } : p
      )
    );
  }

  function handleDeleteProduto(id: string) {
    setProdutos((current) => current.filter((item) => item.id !== id));
  }

  const totalPedidos = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter((order) => order.status === 'Pendente').length;
  const deliveredOrders = orders.filter((order) => order.status === 'Entregue').length;
  const totalProdutos = produtos.length;
  const produtosDisponiveis = produtos.filter((item) => item.available).length;

  return (
    <div className="min-h-screen bg-[#03020a] text-white">
      <AdminSidebar selectedSection={selectedSection} onSelectSection={setSelectedSection} />

      <div className="ml-60">
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-[#09060f]/90 px-8 py-6 shadow-xl shadow-black/40">
          <AdminHeader />
          <AdminUserLabel user={user} onLogout={handleLogout} />
        </header>

        <main className="px-8 py-8">
          <AdminDashboard totalProdutos={totalProdutos} totalPedidos={totalPedidos} />

          <div className="mt-8 space-y-8">
            {selectedSection === 'produtos' && (
              <AdminProdutos
                produtos={produtos}
                onAddProduto={handleAddProduto}
                onUpdateProduto={handleUpdateProduto}
                onDeleteProduto={handleDeleteProduto}
              />
            )}

            {selectedSection === 'compras' && <AdminCompras orders={orders} />}

            {selectedSection === 'histórico' && <AdminHistorico orders={orders} />}

            {selectedSection === 'relatórios' && (
              <AdminRelatorios
                totalRevenue={totalRevenue}
                pendingOrders={pendingOrders}
                deliveredOrders={deliveredOrders}
                produtosDisponiveis={produtosDisponiveis}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
