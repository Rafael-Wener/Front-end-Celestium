"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavbarCelestium() {
    const [nickname, setNickname] = useState("");

    useEffect(() => {
        const atualizarUsuario = () => {
            setNickname(localStorage.getItem("nickname") || "");
        };
        atualizarUsuario();
        window.addEventListener("userChanged", atualizarUsuario);
        return () => {
            window.removeEventListener("userChanged", atualizarUsuario);
        };
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("nickname");
        setNickname("");
        window.dispatchEvent(new Event("userChanged"));
    }

    return (
        <div className="bg-gray-950 w-full h-22 flex items-center justify-between px-40">
            {/* PARTE DO LOGO */}
            <div className="flex items-center justify-center gap-2">
                <img
                    src="/logoCeslestiumtrue.png"
                    alt="Logo Celestium"
                    className="h-12 w-12 rounded-md mr-4"
                />
                <span className="text-white text-lg font-bold">Celestium</span>
                <span className="text-purple-500 text-lg font-bold">MC</span>
            </div>

            {/* PARTE DO MENU */}
            <div className="flex items-center gap-6 justify-center font-bold">
                <a href="#" className="text-white text-sm border-b-2 border-transparent hover:border-b-purple-500 transition-colors duration-300">Ínicio</a>

                <a href="/celestium/loja" className="text-white text-sm border-b-2 border-transparent hover:border-b-purple-500 transition-colors duration-300">Loja</a>
                
                <a href="https://discord.gg/MF2m9DE8s" className="text-white text-sm border-b-2 border-transparent hover:border-b-purple-500 transition-colors duration-300">Discord</a>

            </div>

            {/* PARTE DO LOGIN */}
            <div className="flex justify-center items-center gap-1">
                {/* BOTÃO ENTRAR */}
                <button className="flex items-center justify-center cursor-pointer group">
                    <div className="flex items-center justify-center">
                        <img
                            src="/usuario.png"
                            alt="User Icon"
                            className="w-4 h-4 invert opacity-60 group-hover:opacity-100 transition-all duration-300"
                        />

                        <Link href="/login">
                            <span className="text-gray-400 text-sm font-bold rounded-md px-4 py-1 transition-colors duration-300 group-hover:text-white">
                                {nickname || "Entrar"}
                            </span>
                        </Link>
                    </div>
                </button>

                {/* BOTÃO CADASTRAR */}
                {!nickname && (
                    <button className="flex cursor-pointer text-white text-sm font-bold rounded-md px-4 py-2 bg-purple-500 transition-colors duration-300 hover:bg-purple-600">
                        <Link href="/cadastro">
                            <span>Cadastrar</span>
                        </Link>
                    </button>
                )}

                {/* BOTÃO DISCORD */}
                <button className="cursor-pointer flex">
                    <Link href="https://discord.gg/MF2m9DE8s">
                        <div className="text-white text-sm font-bold rounded-md px-4 py-2 bg-blue-500 transition-colors duration-300 ml-2 flex flex-row hover:bg-blue-600">
                            <img
                                src="/Discord.png"
                                alt="Discord"
                                className="w-5 h-5 invert mr-2"
                            />
                            <span>Discord</span>
                        </div>
                    </Link>
                </button>

                {/* BOTÃO SAIR */}
                {nickname && (
                    <button
                        onClick={handleLogout}
                        className="cursor-pointer flex flex-row text-gray-400 transition-all duration-300 hover:text-white group"
                    >
                        <div className="flex ml-2">
                            <img
                                src="/opcao-de-sair.png"
                                alt="Deslogar"
                                className="w-5 h-5 invert mr-2 opacity-60 group-hover:opacity-100 transition-all duration-300"
                            />
                            <span className="font-bold text-sm">Sair</span>
                        </div>
                    </button>
                )}
            </div>
        </div>
    );
}