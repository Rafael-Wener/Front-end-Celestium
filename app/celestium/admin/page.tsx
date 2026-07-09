"use client";

import { useState } from "react";
import NavbarAdmin from "./AdminNavbar";
import SidebarAdmin from "./AdminSidebar";

// Importe aqui os componentes que você criou na pasta components
import AdicionarProdutos from "./components/AdicionarProdutos";
import Categorias from "./components/Categorias";
import Pedidos from "./components/Pedidos";
import Relatorios from "./components/Relatorios";
import Produtos from "./components/Produtos";

export default function AdminDashboard() {
  // Estado para controlar qual aba o Admin está visualizando
  const [abaAtiva, setAbaAtiva] = useState("Produtos");

  // Função que decide qual tela exibir no miolo da página
  function renderizarConteudo() {
    switch (abaAtiva) {

      case "Produtos":
        return <Produtos />;
          case "Adicionar Produtos":
        return <AdicionarProdutos />;
      case "Categorias": 
        return <Categorias />;
      case "Pedidos":
        return <Pedidos />;
      case "Relatórios":
        return <Relatorios />;
      default:
        return <Produtos />;
    }
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0a0516]">
      {/* Passamos a função onTabChange para o Sidebar atualizar o estado aqui da página */}
      <SidebarAdmin initialActiveTab={abaAtiva} onTabChange={(tab) => setAbaAtiva(tab)} />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <NavbarAdmin />
        <main className="flex-1 overflow-y-auto p-8 layout-scrollbar">
          {/* Agora o conteúdo muda dinamicamente! */}
          {renderizarConteudo()}
        </main>
      </div>
    </div>
  );
}