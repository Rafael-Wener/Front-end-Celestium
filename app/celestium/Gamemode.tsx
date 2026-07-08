"use client";

import { useState } from "react";

export default function GameModesCelestium() {
    const [aberto, setAberto] = useState<string | null>("survival");

    function AbrirTabela(modo: string) {
        setAberto(aberto === modo ? null : modo);
    }

    return (
        <div className="w-full bg-[#06020f] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-950/10 via-[#06020f] to-[#06020f] py-16 text-white px-6 md:px-12 xl:px-40 relative overflow-hidden">
            
            {/* TÍTULO DA SEÇÃO */}
            <div className="flex flex-col justify-center items-center w-full text-center mb-4">
                <div className="text-purple-500 font-black text-xs uppercase tracking-[0.25em]">// NOSSOS MODOS DE JOGO</div>
                <h2 className="mt-2 text-3xl font-black tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent uppercase">
                    Escolha seu Universo
                </h2>
                <p className="mt-2 max-w-md text-xs text-neutral-400 font-medium leading-relaxed">
                    Explore nossos mundos dedicados, cada um com mecânicas exclusivas e economias balanceadas.
                </p>
            </div>

            {/* GRID DOS MODOS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-12 w-full">

                {/* MODO: SURVIVAL (EMERALD) */}
                <div className="flex flex-col h-fit">
                    <button 
                        onClick={() => AbrirTabela("survival")} 
                        className={`group w-full border-t-4 border-t-emerald-500 bg-[#0d071f]/40 backdrop-blur-sm p-5 rounded-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:bg-[#0d071f]/70 border border-x-purple-500/5 border-b-purple-500/5 hover:border-emerald-500/30 cursor-pointer text-left shadow-lg ${
                            aberto === "survival" ? "bg-[#0d071f]/80 border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.05)]" : ""
                        }`}
                    >
                        <div className="flex items-center gap-4 w-full">
                            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                <img src="/arvore-de-natal.png" alt="icone de arvore" className="h-5 w-5 [filter:invert(72%)_sepia(50%)_saturate(500%)_hue-rotate(110deg)]" />
                            </div>
                            <div>
                                <h2 className="font-black text-lg tracking-wide text-white group-hover:text-emerald-400 transition-colors">Survival</h2>
                                <h3 className="text-[11px] text-neutral-400 font-medium mt-0.5">Sobreviva, construa e conquiste.</h3>
                            </div>
                        </div>
                        <div className="flex items-center justify-center w-full mt-4 border-t border-purple-500/5 pt-2">
                            <img src="/sinal-de-seta-para-baixo-para-navegar.png" alt="seta" className={`h-3 w-3 opacity-40 transition-transform duration-300 invert ${aberto === "survival" ? "rotate-180 opacity-100 [filter:invert(72%)_sepia(50%)_saturate(500%)_hue-rotate(110deg)]" : ""}`} />
                        </div>
                    </button>
                    
                    {/* CONTEÚDO EXPANSÍVEL: SURVIVAL */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out border-b-2 border-b-emerald-500 rounded-b-xl ${aberto === "survival" ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                        <div className="bg-[#0b061a]/60 border border-purple-500/10 backdrop-blur-md rounded-b-xl p-4 text-xs text-neutral-300 flex flex-col gap-3">
                            
                            <div className="flex items-start gap-3 border-b border-purple-500/5 pb-3">
                                <img src="/coroa.png" alt="coroa VIP" className="invert h-5 w-5 opacity-70 mt-0.5" />
                                <div className="flex flex-col">
                                    <h4 className="font-bold text-white text-sm">Vips</h4>
                                    <p className="text-neutral-400 mt-0.5 leading-relaxed">Benefícios incríveis para destacar sua jornada.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 border-b border-purple-500/5 pb-3">
                                <img src="/cifrao.png" alt="celestiun coin" className="invert h-5 w-5 opacity-70 mt-0.5" />
                                <div className="flex flex-col">
                                    <h4 className="font-bold text-white text-sm">Celestiuns</h4>
                                    <p className="text-neutral-400 mt-0.5 leading-relaxed">Moeda exclusiva do servidor para diversas utilidades.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 border-b border-purple-500/5 pb-3">
                                <img src="/bau-de-tesouro.png" alt="outros" className="invert h-5 w-5 opacity-70 mt-0.5" />
                                <div className="flex flex-col">
                                    <h4 className="font-bold text-white text-sm">Outros</h4>
                                    <p className="text-neutral-400 mt-0.5 leading-relaxed">Itens extras e melhorias para sua experiência.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <img src="/escudo.png" alt="Perder Banimento" className="invert h-5 w-5 opacity-70 mt-0.5" />
                                <div className="flex flex-col">
                                    <h4 className="font-bold text-white text-sm">UnBan</h4>
                                    <p className="text-neutral-400 mt-0.5 leading-relaxed">Recupere seu acesso e volte a jogar sem complicações.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MODO: SMP (BLUE) */}
                <div className="flex flex-col h-fit">
                    <button 
                        onClick={() => AbrirTabela("smp")} 
                        className={`group w-full border-t-4 border-t-blue-500 bg-[#0d071f]/40 backdrop-blur-sm p-5 rounded-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:bg-[#0d071f]/70 border border-x-purple-500/5 border-b-purple-500/5 hover:border-blue-500/30 cursor-pointer text-left shadow-lg ${
                            aberto === "smp" ? "bg-[#0d071f]/80 border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.05)]" : ""
                        }`}
                    >
                        <div className="flex items-center gap-4 w-full">
                            <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                <img src="/no-mundo-todo.png" alt="icone de mundo" className="h-5 w-5 [filter:invert(42%)_sepia(90%)_saturate(500%)_hue-rotate(190deg)]" />
                            </div>
                            <div>
                                <h2 className="font-black text-lg tracking-wide text-white group-hover:text-blue-400 transition-colors">SMP</h2>
                                <h3 className="text-[11px] text-neutral-400 font-medium mt-0.5">Evolua, upar e seja o melhor.</h3>
                            </div>
                        </div>
                        <div className="flex items-center justify-center w-full mt-4 border-t border-purple-500/5 pt-2">
                            <img src="/sinal-de-seta-para-baixo-para-navegar.png" alt="seta" className={`h-3 w-3 opacity-40 transition-transform duration-300 invert ${aberto === "smp" ? "rotate-180 opacity-100 [filter:invert(42%)_sepia(90%)_saturate(500%)_hue-rotate(190deg)]" : ""}`} />
                        </div>
                    </button>
                    
                    {/* CONTEÚDO EXPANSÍVEL: SMP */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out border-b-2 border-b-blue-500 rounded-b-xl ${aberto === "smp" ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                        <div className="bg-[#0b061a]/60 border border-purple-500/10 backdrop-blur-md rounded-b-xl p-4 text-xs text-neutral-300 flex flex-col gap-3">
                            
                            <div className="flex items-start gap-3 border-b border-purple-500/5 pb-3">
                                <img src="/rank.png" alt="RankUper" className="invert h-5 w-5 opacity-70 mt-0.5" />
                                <div className="flex flex-col">
                                    <h4 className="font-bold text-white text-sm">Ranks</h4>
                                    <p className="text-neutral-400 mt-0.5 leading-relaxed">Evolua seus status e ganhe benefícios exclusivos.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 border-b border-purple-500/5 pb-3">
                                <img src="/pacote.png" alt="pacotes KIT" className="invert h-5 w-5 opacity-70 mt-0.5" />
                                <div className="flex flex-col">
                                    <h4 className="font-bold text-white text-sm">KITs</h4>
                                    <p className="text-neutral-400 mt-0.5 leading-relaxed">Kits especiais para te ajudar na sua jornada.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 border-b border-purple-500/5 pb-3">
                                <img src="/cifrao.png" alt="celestiun coin" className="invert h-5 w-5 opacity-70 mt-0.5" />
                                <div className="flex flex-col">
                                    <h4 className="font-bold text-white text-sm">Celestiuns</h4>
                                    <p className="text-neutral-400 mt-0.5 leading-relaxed">Moeda exclusiva do servidor para diversas utilidades.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 border-b border-purple-500/5 pb-3">
                                <img src="/bau-de-tesouro.png" alt="outros" className="invert h-5 w-5 opacity-70 mt-0.5" />
                                <div className="flex flex-col">
                                    <h4 className="font-bold text-white text-sm">Outros</h4>
                                    <p className="text-neutral-400 mt-0.5 leading-relaxed">Itens extras e melhorias para sua experiência.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <img src="/escudo.png" alt="Perder Banimento" className="invert h-5 w-5 opacity-70 mt-0.5" />
                                <div className="flex flex-col">
                                    <h4 className="font-bold text-white text-sm">UnBan</h4>
                                    <p className="text-neutral-400 mt-0.5 leading-relaxed">Recupere seu acesso e volte a jogar sem complicações.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MODO: RANKUP (AMBER) */}
                <div className="flex flex-col h-fit">
                    <button 
                        onClick={() => AbrirTabela("rankup")} 
                        className={`group w-full border-t-4 border-t-amber-500 bg-[#0d071f]/40 backdrop-blur-sm p-5 rounded-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:bg-[#0d071f]/70 border border-x-purple-500/5 border-b-purple-500/5 hover:border-amber-500/30 cursor-pointer text-left shadow-lg ${
                            aberto === "rankup" ? "bg-[#0d071f]/80 border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.05)]" : ""
                        }`}
                    >
                        <div className="flex items-center gap-4 w-full">
                            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                <img src="/setas-para-cima.png" alt="icone de Levelup" className="h-5 w-5 [filter:invert(80%)_sepia(80%)_saturate(500%)_hue-rotate(10deg)]" />
                            </div>
                            <div>
                                <h2 className="font-black text-lg tracking-wide text-white group-hover:text-amber-400 transition-colors">RankUP</h2>
                                <h3 className="text-[11px] text-neutral-400 font-medium mt-0.5">Evolua, upar e seja o melhor.</h3>
                            </div>
                        </div>
                        <div className="flex items-center justify-center w-full mt-4 border-t border-purple-500/5 pt-2">
                            <img src="/sinal-de-seta-para-baixo-para-navegar.png" alt="seta" className={`h-3 w-3 opacity-40 transition-transform duration-300 invert ${aberto === "rankup" ? "rotate-180 opacity-100 [filter:invert(80%)_sepia(80%)_saturate(500%)_hue-rotate(10deg)]" : ""}`} />
                        </div>
                    </button>
                    
                    {/* CONTEÚDO EXPANSÍVEL: RANKUP */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out border-b-2 border-b-amber-500 rounded-b-xl ${aberto === "rankup" ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                        <div className="bg-[#0b061a]/60 border border-purple-500/10 backdrop-blur-md rounded-b-xl p-4 text-xs text-neutral-300 flex flex-col gap-3">
                            
                            <div className="flex items-start gap-3 border-b border-purple-500/5 pb-3">
                                <img src="/cifrao.png" alt="celestiun coin" className="invert h-5 w-5 opacity-70 mt-0.5" />
                                <div className="flex flex-col">
                                    <h4 className="font-bold text-white text-sm">Celestiuns</h4>
                                    <p className="text-neutral-400 mt-0.5 leading-relaxed">Moeda exclusiva do servidor para diversas utilidades.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 border-b border-purple-500/5 pb-3">
                                <img src="/bau-de-tesouro.png" alt="outros" className="invert h-5 w-5 opacity-70 mt-0.5" />
                                <div className="flex flex-col">
                                    <h4 className="font-bold text-white text-sm">Outros</h4>
                                    <p className="text-neutral-400 mt-0.5 leading-relaxed">Itens extras e melhorias para sua experiência.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <img src="/escudo.png" alt="Perder Banimento" className="invert h-5 w-5 opacity-70 mt-0.5" />
                                <div className="flex flex-col">
                                    <h4 className="font-bold text-white text-sm">UnBan</h4>
                                    <p className="text-neutral-400 mt-0.5 leading-relaxed">Recupere seu acesso e volte a jogar sem complicações.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MODO: BOXPVP (ROSE) */}
                <div className="flex flex-col h-fit">
                    <button 
                        onClick={() => AbrirTabela("boxpvp")} 
                        className={`group w-full border-t-4 border-t-rose-500 bg-[#0d071f]/40 backdrop-blur-sm p-5 rounded-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:bg-[#0d071f]/70 border border-x-purple-500/5 border-b-purple-500/5 hover:border-rose-500/30 cursor-pointer text-left shadow-lg ${
                            aberto === "boxpvp" ? "bg-[#0d071f]/80 border-rose-500/20 shadow-[0_0_30px_rgba(244,63,94,0.05)]" : ""
                        }`}
                    >
                        <div className="flex items-center gap-4 w-full">
                            <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                                <img src="/espadas.png" alt="icone de espada" className="h-5 w-5 [filter:invert(40%)_sepia(80%)_saturate(500%)_hue-rotate(320deg)]" />
                            </div>
                            <div>
                                <h2 className="font-black text-lg tracking-wide text-white group-hover:text-rose-400 transition-colors">BoxPVP</h2>
                                <h3 className="text-[11px] text-neutral-400 font-medium mt-0.5">PvP rápido, justo e intenso.</h3>
                            </div>
                        </div>
                        <div className="flex items-center justify-center w-full mt-4 border-t border-purple-500/5 pt-2">
                            <img src="/sinal-de-seta-para-baixo-para-navegar.png" alt="seta" className={`h-3 w-3 opacity-40 transition-transform duration-300 invert ${aberto === "boxpvp" ? "rotate-180 opacity-100 [filter:invert(40%)_sepia(80%)_saturate(500%)_hue-rotate(320deg)]" : ""}`} />
                        </div>
                    </button>
                    
                    {/* CONTEÚDO EXPANSÍVEL: BOXPVP */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out border-b-2 border-b-rose-500 rounded-b-xl ${aberto === "boxpvp" ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                        <div className="bg-[#0b061a]/60 border border-purple-500/10 backdrop-blur-md rounded-b-xl p-4 text-xs text-neutral-300 flex flex-col gap-3">
                            
                            <div className="flex items-start gap-3 border-b border-purple-500/5 pb-3">
                                <img src="/coroa.png" alt="coroa VIP" className="invert h-5 w-5 opacity-70 mt-0.5" />
                                <div className="flex flex-col">
                                    <h4 className="font-bold text-white text-sm">Vips</h4>
                                    <p className="text-neutral-400 mt-0.5 leading-relaxed">Benefícios incríveis para destacar sua jornada.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 border-b border-purple-500/5 pb-3">
                                <img src="/pacote.png" alt="pacotes KIT" className="invert h-5 w-5 opacity-70 mt-0.5" />
                                <div className="flex flex-col">
                                    <h4 className="font-bold text-white text-sm">KITs</h4>
                                    <p className="text-neutral-400 mt-0.5 leading-relaxed">Kits especiais para te ajudar na sua jornada.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 border-b border-purple-500/5 pb-3">
                                <img src="/cifrao.png" alt="celestiun coin" className="invert h-5 w-5 opacity-70 mt-0.5" />
                                <div className="flex flex-col">
                                    <h4 className="font-bold text-white text-sm">Celestiuns</h4>
                                    <p className="text-neutral-400 mt-0.5 leading-relaxed">Moeda exclusiva do servidor para diversas utilidades.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 border-b border-purple-500/5 pb-3">
                                <img src="/bau-de-tesouro.png" alt="outros" className="invert h-5 w-5 opacity-70 mt-0.5" />
                                <div className="flex flex-col">
                                    <h4 className="font-bold text-white text-sm">Outros</h4>
                                    <p className="text-neutral-400 mt-0.5 leading-relaxed">Itens extras e melhorias para sua experiência.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <img src="/escudo.png" alt="Perder Banimento" className="invert h-5 w-5 opacity-70 mt-0.5" />
                                <div className="flex flex-col">
                                    <h4 className="font-bold text-white text-sm">UnBan</h4>
                                    <p className="text-neutral-400 mt-0.5 leading-relaxed">Recupere seu acesso e volte a jogar sem complicações.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}