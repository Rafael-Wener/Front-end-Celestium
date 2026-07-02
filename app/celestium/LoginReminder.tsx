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
    <div className="bg-white flex flex-col w-full items-start px-40">
      <div className="flex gap-4 bg-[#140b2b] w-full p-10 rounded-2xl shadow-black shadow-[2px_2px_10px_2px] mt-15 items-center justify-between">

        {/* Ícone */}
        <div className="border border-purple-900 rounded-2xl h-16 w-16 flex items-center justify-center bg-[#3B076499] shadow-[0_0_4px_#C084FC]">
          <img
            src="/cadeado aberto.png"
            alt="Cadeado desbloqueado"
            className="filter[invert(40%)_sepia(80%)_saturate(500%)_hue-rotate(240deg)] h-10 w-10"
          />
        </div>

        {/* Texto */}
        <div className="flex flex-col flex-1">
          <h1 className="font-bold text-white text-xl">
            Antes de acessar a loja, faça login ou crie sua conta.
          </h1>

          <span className="text-gray-400">
            É rápido, seguro e você garante acesso a todos os benefícios!
          </span>
        </div>

        {/* Botões */}
        <div className="flex gap-4">
          <a
            href="/login"
            className="flex items-center justify-center bg-purple-700 rounded-md h-10 px-6 hover:bg-purple-600 transition-all hover:scale-105 duration-300"
          >
            <img
              src="/usuario.png"
              alt="Usuário"
              className="h-4 w-4 invert mr-2"
            />
            <span className="font-bold text-white">Entrar na conta</span>
          </a>

          <a
            href="/cadastro"
            className="flex items-center justify-center bg-purple-950/40 rounded-md h-10 px-6 border border-purple-900 hover:bg-purple-800/40 hover:border-purple-800 transition-all hover:scale-105 duration-300"
          >
            <img
              src="/adicionar-usuario.png"
              alt="Cadastrar"
              className="h-5 w-5 invert mr-2"
            />
            <span className="font-bold text-white">
              Criar cadastro
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}