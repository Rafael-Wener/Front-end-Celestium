"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  async function handleLogin() {
    setErro("");

    if (!email || !password) {
      setErro("Preencha todos os campos!");
      return;
    }

    try {
      const res = await fetch("http://10.200.80.81:3005/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("nickname", data.user.nickname);

        setTimeout(() => {
          router.push("/celestium");
        }, 900);
      } else {
        setErro(data.message || "Usuário ou senha incorretos!");
      }
    } catch (error) {
      setErro("Erro ao conectar com o servidor!");
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#080011] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('/bg-server.png')] bg-cover bg-center opacity-70"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-purple-950/40 to-black/80"></div>

      <div className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Lado esquerdo */}
        <div className="hidden lg:flex flex-col items-center justify-center text-center px-10">
          <img
            src="/logoCeslestiumtrue.png"
            alt="Logo"
            className="w-72 mb-8 drop-shadow-[0_0_35px_rgba(168,85,247,0.7)]"
          />

          <h1 className="text-5xl font-bold tracking-widest">
            ENTRE NO SERVIDOR
          </h1>

          <p className="text-purple-300 font-semibold text-xl mt-4">
            Seu reino. Suas aventuras. Seu legado.
          </p>

          <p className="text-zinc-300 max-w-md mt-5">
            Acesse a loja oficial, gerencie sua conta e desbloqueie tudo que
            nosso servidor oferece.
          </p>
        </div>

        {/* Formulário */}
        <div className="flex flex-col items-center justify-center px-6">
          <div className="border border-purple-500/30 shadow-[0_0_45px_rgba(126,34,206,0.25)] flex flex-col bg-zinc-950/70 backdrop-blur-md w-full max-w-[480px] rounded-2xl px-8 py-10">
            <div className="lg:hidden flex justify-center mb-6">
              <img
                src="/logoCeslestiumtrue.png"
                alt="Logo"
                className="w-32 drop-shadow-[0_0_25px_rgba(168,85,247,0.8)]"
              />
            </div>

            <div className="w-full flex justify-center mb-6">
              <div className="h-px w-40 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            </div>

            <h1 className="font-bold text-4xl text-center">Entrar</h1>

            <div className="text-purple-200/60 text-center mt-2">
              Faça login para acessar a loja
            </div>

            <div className="pt-8 w-full">
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">Email</h2>

                <input
                  className="p-4 bg-zinc-950/80 border border-purple-500/25 rounded-xl w-full hover:border-purple-500/60 focus:border-purple-500/60 focus:outline-none text-purple-100 placeholder:text-zinc-500"
                  placeholder="Digite seu email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <h2 className="pt-6 font-semibold">Senha</h2>

                <input
                  className="p-4 bg-zinc-950/80 border border-purple-500/25 rounded-xl w-full hover:border-purple-500/60 focus:border-purple-500/60 focus:outline-none text-purple-100 placeholder:text-zinc-500"
                  placeholder="Digite sua senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-5 text-sm">
              <label className="flex items-center gap-2 text-zinc-300 cursor-pointer">
                <input type="checkbox" className="accent-purple-600" />
                Lembrar de mim
              </label>

              <a
                href="#"
                className="text-purple-400 hover:text-purple-300 duration-300"
              >
                Esqueci minha senha
              </a>
            </div>

            {erro && (
              <p className="text-red-400 text-sm mt-5 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {erro}
              </p>
            )}

            <div className="pt-7 w-full">
              <button
                onClick={handleLogin}
                className="px-4 bg-purple-700 font-bold py-4 rounded-xl w-full hover:bg-purple-600 hover:scale-[1.01] duration-300 cursor-pointer"
              >
                Entrar
              </button>
            </div>

            <div className="pt-7 w-full flex items-center justify-center">
              <a
                href="/cadastro"
                className="text-purple-400 hover:text-purple-200 duration-300"
              >
                Não tem conta? Se cadastre aqui
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}