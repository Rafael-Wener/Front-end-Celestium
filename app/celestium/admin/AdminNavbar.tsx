"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface NavbarAdminProps {
  onLogout?: () => void;
}

interface UserSession {
  name: string;
  email: string;
}

export default function NavbarAdmin({ onLogout }: NavbarAdminProps) {
  const router = useRouter();
  const [usuario, setUsuario] = useState<UserSession | null>(null);

  useEffect(() => {
    // 1. Tenta buscar os dados do usuário salvos no localStorage (ou decodificar do Token)
    const token = localStorage.getItem("token");
    
    if (!token) {
      // Se não tiver token, já manda de volta pro login por segurança
      router.push("/login");
      return;
    }

    try {
      // Opção A: Se o seu backend salva o objeto do usuário no localStorage ao logar:
      const userData = localStorage.getItem("user");
      if (userData) {
        setUsuario(JSON.parse(userData));
      } else {
        // Opção B: Caso não tenha o objeto "user", decodifica a carga útil (payload) do JWT
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          window
            .atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        const tokenDecodificado = JSON.parse(jsonPayload);
        
        setUsuario({
          name: tokenDecodificado.name || tokenDecodificado.username || "Admin",
          email: tokenDecodificado.email || "Painel",
        });
      }
    } catch (error) {
      console.error("Erro ao ler dados da sessão:", error);
    }
  }, [router]);

  // Função unificada para deslogar com segurança
  function handleSair() {
    // Se foi passada alguma função customizada por Props, executa ela
    if (onLogout) {
      onLogout();
    }

    // Limpa as credenciais de login armazenadas
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redireciona o usuário imediatamente para a tela de Login
    router.push("/login");
  }

  return (
    <header className="flex h-20 w-full items-center justify-between border-b border-purple-950/30 bg-[#0c061a] px-8 text-white">
      {/* Lado Esquerdo: Logo e Identificação do Painel */}
      <div className="flex items-center gap-4">
        {/* Container do Ícone/Logo */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-b from-purple-900/50 to-purple-950/50 p-1 shadow-[0_4px_12px_rgba(110,68,255,0.1)]">
          <img
            src="/logoCeslestiumtrue.png"
            alt="Celestium Logo"
            className="h-9 w-9 object-contain"
            onError={(e) => {
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

        {/* Caixa de Informações do Usuário/Cargo dinâmico */}
        <div className="flex flex-col justify-center rounded-md px-5 py-1 text-left min-w-[120px] h-[38px]">
          <span className="font-bold text-white leading-tight truncate max-w-[150px]">
            {usuario?.name || "Carregando..."}
          </span>
          <span className="text-xs font-medium text-neutral-500 leading-tight truncate max-w-[150px]">
            {usuario?.email || "—"}
          </span>
        </div>

        {/* Botão Sair Funcional */}
        <button
          onClick={handleSair}
          className="rounded-md bg-purple-600 px-5 py-2 text-sm font-bold text-white transition-all duration-300 hover:bg-purple-700 hover:shadow-[0_0_15px_rgba(147,51,234,0.4)] cursor-pointer"
        >
          Sair
        </button>
      </div>
    </header>
  );
}