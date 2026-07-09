"use client";

import { useState } from "react";

interface SidebarAdminProps {
  initialActiveTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function SidebarAdmin({ initialActiveTab = "Produtos", onTabChange }: SidebarAdminProps) {
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  const menuItems = [
    { name: "Produtos", id: "produtos" },
    { name: "Adicionar Produtos", id: "adicionar-produtos" },
    { name: "Categorias", id: "categorias" },
    { name: "Pedidos", id: "pedidos" },
    { name: "Relatórios", id: "relatorios" },

  ];

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    if (onTabChange) onTabChange(tabName);
  };

  return (
    <aside className="flex h-screen w-64 flex-col justify-between bg-[#06030d] p-5 text-white border-r border-purple-950/10">
      {/* Parte Superior: Menu de Navegação */}
      <div className="flex flex-col">
        {/* Título da Seção (Contexto da imagem anterior) */}
        <div className="mb-4 px-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600">
            MENU
          </span>
          <h2 className="mt-0.5 text-lg font-bold text-white tracking-wide">
            Navegação
          </h2>
        </div>

        {/* Lista de Botões/Links */}
        <nav className="flex flex-col gap-2.5">
          {menuItems.map((item) => {
            const isActive = activeTab === item.name;

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.name)}
                className={`w-full rounded-md py-3.5 px-5 text-left text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#9333ea] text-white shadow-[0_4px_20px_rgba(147,51,234,0.25)]"
                    : "bg-[#130d24]/60 text-white/90 border border-purple-950/20 hover:bg-[#1a1230] hover:text-white"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Parte Inferior: Ícone Redondo (Logo Next.js / Estilizado) */}
      <div className="mt-auto pt-6 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-[#000000] text-sm font-black font-mono text-white/90 shadow-inner">
          N
        </div>
      </div>
    </aside>
  );
}