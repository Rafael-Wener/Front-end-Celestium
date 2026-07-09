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
  const [autorizado, setAutorizado] = useState(false); // Controle simples de exibição

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      let isAdmin = false;
      let nomeUsuario = "Admin";
      let emailUsuario = "Painel";

      if (userData) {
        const user = JSON.parse(userData);
        nomeUsuario = user.name || user.username || nomeUsuario;
        emailUsuario = user.email || emailUsuario;

        // Checagem ultra tolerante: aceita "ADMIN", "admin", ou se o email/role tiver 'admin' no texto
        const roleString = String(user.role || "").toUpperCase();
        const emailString = String(user.email || "").toLowerCase();
        
        if (roleString === "ADMIN" || user.isAdmin === true || emailString.includes("admin")) {
          isAdmin = true;
        }
      } else {
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
        
        nomeUsuario = tokenDecodificado.name || tokenDecodificado.username || nomeUsuario;
        emailUsuario = tokenDecodificado.email || emailUsuario;

        const roleString = String(tokenDecodificado.role || "").toUpperCase();
        const emailString = String(emailUsuario).toLowerCase();

        if (roleString === "ADMIN" || tokenDecodificado.isAdmin === true || emailString.includes("admin")) {
          isAdmin = true;
        }
      }

      if (isAdmin) {
        setUsuario({ name: nomeUsuario, email: emailUsuario });
        setAutorizado(true);
      } else {
        alert("Acesso restrito apenas para administradores!");
        router.push("/login");
      }

    } catch (error) {
      console.error("Erro ao ler dados da sessão:", error);
      router.push("/login");
    }
  }, [router]);

  // Função unificada para deslogar com segurança
  function handleSair() {
    if (onLogout) {
      onLogout();
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  }

  // Se o usuário ainda não foi validado como admin, não mostra nada (evita piscar o painel)
  if (!autorizado) {
    return null;
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