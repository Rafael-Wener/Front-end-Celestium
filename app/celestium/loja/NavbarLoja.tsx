"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBarLoja() {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const nick = localStorage.getItem("nickname");
    if (nick) setNickname(nick);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("nickname");
    setNickname("");
  }

  return (
    <div className="bg-gray-950 w-full h-22 flex items-center justify-between px-40">
      {/* LOGO */}
      <div className="flex items-center">
        <img
          src="/logoCeslestiumtrue.png"
          alt="Logo Celestium"
          className="h-12 w-12 rounded-md mr-4"
        />
        <span className="text-white text-lg font-bold">Celestium</span>
        <span className="text-purple-500 text-lg font-bold">MC</span>
      </div>

      {/* MENU */}
      <div className="flex items-center gap-6 font-bold">
        <a href="/celestium" className="text-white text-sm border-b-2 border-transparent hover:border-b-purple-500 transition-colors duration-300">
          Voltar
        </a>

        <a href="https://discord.gg/MF2m9DE8s" className="text-white text-sm border-b-2 border-transparent hover:border-b-purple-500 transition-colors duration-300">
          Discord
        </a>
      </div>

      {/* LOGIN */}
      <div className="flex items-center gap-1">
        <button className="flex items-center cursor-pointer group">
          <img
            src="/usuario.png"
            alt="User Icon"
            className="w-4 h-4 invert opacity-60 group-hover:opacity-100 transition-all duration-300"
          />

          <Link href="/login">
            <span className="text-gray-400 text-sm font-bold px-4 py-1 group-hover:text-white transition-colors duration-300">
              {nickname || "Entrar"}
            </span>
          </Link>
        </button>

        {!nickname && (
          <button className="flex cursor-pointer text-white text-sm font-bold rounded-md px-4 py-2 bg-purple-500 hover:bg-purple-600 transition-colors duration-300">
            <Link href="/cadastro">
              Cadastrar
            </Link>
          </button>
        )}

        <button className="cursor-pointer flex">
          <Link href="https://discord.gg/MF2m9DE8s">
            <div className="text-white text-sm font-bold rounded-md px-4 py-2 bg-blue-500 ml-2 flex hover:bg-blue-600 transition-colors duration-300">
              <img
                src="/Discord.png"
                alt="Discord"
                className="w-5 h-5 invert mr-2"
              />
              <span>Discord</span>
            </div>
          </Link>
        </button>

        {nickname && (
          <button
            onClick={handleLogout}
            className="cursor-pointer flex text-gray-400 hover:text-white transition-all duration-300 group"
          >
            <img
              src="/opcao-de-sair.png"
              alt="Deslogar"
              className="w-5 h-5 invert mr-2 opacity-60 group-hover:opacity-100 transition-all duration-300"
            />
            <span className="font-bold text-sm">Sair</span>
          </button>
        )}
      </div>
    </div>
  );
}