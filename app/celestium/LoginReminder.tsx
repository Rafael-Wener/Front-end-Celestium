"use client";

import { useEffect, useState } from "react";

export default function LoginReminderCelestium() {
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setLogado(true);
  }, []);

  // Se estiver logado, não mostra o lembrete
  if (logado) return null;

  return (
    <div className="w-full bg-[#06020f] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-950/5 via-[#06020f] to-[#06020f] flex flex-col items-center px-6 md:px-12 xl:px-40 py-8 relative overflow-hidden">
      
      <div className="flex flex-col md:flex-row gap-6 bg-[#0d071f]/40 backdrop-blur-md w-full p-8 rounded-2xl border border-purple-500/50 mt-6 items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.4)] group relative">
        
        {/* Glow de fundo sutil para dar profundidade ao card */}
        <div className="absolute -left-10 top-0 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center gap-5 flex-1 w-full text-center sm:text-left relative z-10">
          {/* Ícone Estilo Premium */}
          <div className="border border-purple-500/20 rounded-xl h-14 w-14 flex items-center justify-center bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.15)] shrink-0 transition-transform duration-300 group-hover:scale-105">
            <img
              src="/cadeado aberto.png"
              alt="Cadeado desbloqueado"
              className="[filter:invert(75%)_sepia(40%)_saturate(1000%)_hue-rotate(220deg)] h-6 w-6"
            />
          </div>

          {/* Textos */}
          <div className="flex flex-col">
            <h2 className="font-black text-white text-lg tracking-tight uppercase bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
              Antes de acessar a loja, conecte-se
            </h2>
            <p className="text-neutral-400 text-xs md:text-sm mt-0.5 font-medium leading-relaxed">
              Faça login ou crie sua conta em segundos para garantir que seus benefícios sejam entregues com segurança.
            </p>
          </div>
        </div>

        {/* Botões Cyberpunk */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto relative z-10 shrink-0">
          
          {/* Botão Entrar (Sólido com Neon Glow) */}
          <a
            href="/login"
            className="flex items-center justify-center bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase tracking-wider rounded-xl h-11 px-6 shadow-[0_4px_20px_rgba(147,51,234,0.25)] hover:shadow-[0_0_25px_rgba(147,51,234,0.45)] transition-all duration-300 hover:scale-105"
          >
            <img
              src="/usuario.png"
              alt="Usuário"
              className="h-3.5 w-3.5 invert brightness-200 mr-2"
            />
            <span>Entrar na conta</span>
          </a>

          {/* Botão Criar Conta (Vazado com borda e efeito de vidro) */}
          <a
            href="/cadastro"
            className="flex items-center justify-center bg-purple-950/20 hover:bg-purple-900/30 text-white font-black text-xs uppercase tracking-wider rounded-xl h-11 px-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105"
          >
            <img
              src="/adicionar-usuario.png"
              alt="Cadastrar"
              className="h-4 w-4 invert brightness-200 mr-2"
            />
            <span>Criar cadastro</span>
          </a>

        </div>
      </div>
    </div>
  );
}