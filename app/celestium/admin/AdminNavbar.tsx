"use client";

import Link from "next/link";

interface NavbarAdminProps {
  onLogout?: () => void;
}

export default function NavbarAdmin({ onLogout }: NavbarAdminProps) {
  return (
    <header className="flex h-20 w-full items-center justify-between border-b border-purple-950/30 bg-[#0c061a] px-8 text-white">
      {/* Lado Esquerdo: Logo e Identificação do Painel */}
      <div className="flex items-center gap-4">
        {/* Container do Ícone/Logo */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-b from-purple-900/50 to-purple-950/50 p-1 shadow-[0_4px_12px_rgba(110,68,255,0.1)]">
          <img
            src="/logoCeslestiumtrue.png" // Substitua pelo caminho real do seu ícone Celestium
            alt="Celestium Logo"
            className="h-9 w-9 object-contain"
            onError={(e) => {
              // Fallback caso a imagem não carregue
              e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a855f7'><path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/></svg>";
            }}
          />
        </div>

        {/* Textos da Marca */}
        <div className="flex flex-col justify-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-purple-400/80">
            Celestium
          </span>
          <h1 className="text-2xl font-bold tracking-wide text-white">
            Admin
          </h1>
        </div>
      </div>

      {/* Lado Direito: Ações e Perfil do Usuário */}
      <div className="flex items-center gap-4">
        {/* Botão de Status ADMIN com espaçamento largo */}
        <div className="rounded-md border border-purple-900/40 bg-purple-950/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-purple-300">
          Admin
        </div>

        {/* Caixa de Informações do Usuário/Cargo */}
        <div className="flex flex-col justify-center rounded-md border border-neutral-800/60 bg-neutral-900/20 px-5 py-1 text-left min-w-[85px] h-[38px]">
          <span className="text-xs font-bold text-white leading-tight">
            Admin
          </span>
          <span className="text-[10px] font-medium text-neutral-500 leading-tight">
            —
          </span>
        </div>

        {/* Botão Sair */}
        <button
          onClick={onLogout}
          className="rounded-md bg-purple-600 px-5 py-2 text-sm font-bold text-white transition-all duration-300 hover:bg-purple-700 hover:shadow-[0_0_15px_rgba(147,51,234,0.4)] cursor-pointer"
        >
          Sair
        </button>
      </div>
    </header>
  );
}