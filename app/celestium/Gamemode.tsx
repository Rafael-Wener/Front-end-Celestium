"use client";

import { useState } from "react";

export default function GameModesCelestium() {
    const [aberto, setAberto] = useState<string | null>("survival");

    function AbrirTabela(modo: string) {
        setAberto(aberto === modo ? null : modo);
    }

    return (
        <div className="flex flex-col justify-center items-center w-full py-16 bg-white">
            <div className="flex flex-col justify-center items-center w-full">
                <div className="text-purple-400 font-bold text-xs">{"// NOSSOS MODOS DE JOGO"}</div>
            </div>

            <div className="grid grid-cols-4 gap-10 py-16 w-full px-40">

                {/* SURVIVAL COR É EMERALD-500*/}
                <div className="flex flex-col">
                    <button onClick={() => AbrirTabela("survival")} className="border-t-4 border-t-emerald-500 bg-[#140b2b] items-center justify-center p-4 text-xl font-sans rounded-xl hover:scale-110 duration-400 transition-all cursor-pointer">
                        <div className="flex flex-row items-center justify-center gap-6">
                            <img src="/arvore-de-natal.png" alt="icone de arvore" className="h-4 w-4 [filter:invert(72%)_sepia(50%)_saturate(500%)_hue-rotate(110deg)]" />
                            <h2 className="font-bold">Survival</h2>
                        </div>
                        <h3 className="flex items-center justify-center text-xs text-gray-400">Sobreviva, construa e conquiste.</h3>
                        <div className="flex items-center justify-center mt-2">
                            <img src="/sinal-de-seta-para-baixo-para-navegar.png" alt="seta" className={`h-4 w-4 invert transition-transform duration-300 ${aberto === "survival" ? "rotate-180" : ""}`} />
                        </div>
                    </button>

                    {/* TELA ABERTA COR É EMERALD-500 */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out border-b-2 border-b-emerald-500 rounded-xl ${aberto === "survival" ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                        <div className="bg-[#140b2b] rounded-xl p-4 text-sm text-gray-300 flex flex-col gap-2">

                            {/* VIPS */}
                            <div className="flex flex-row items-center gap-2 border-b-emerald-500 border-2 border-transparent pb-2">
                                <img src="/coroa.png" alt="coroa VIP" className="invert h-7 w-7 mt-1" />
                                <div className="flex flex-col">
                                    <h3 className="font-bold">Vips</h3>
                                    <p>Benefícios incríveis para destacar sua jornada</p>
                                </div>
                            </div>

                            {/* CELESTIUNS COINS */}
                            <div className="flex flex-row items-center gap-2 border-b-emerald-500 border-2 border-transparent pb-2">
                                <img src="/cifrao.png" alt="celestiun coin" className="invert h-7 w-7 mt-1" />
                                <div className="flex flex-col">
                                    <h3 className="font-bold">Celestiuns</h3>
                                    <p>Moeda exclusiva do servidor para diversas utilidades</p>
                                </div>
                            </div>

                            {/* OUTROS */}
                            <div className="flex flex-row items-center gap-2 border-b-emerald-500 border-2 border-transparent pb-2">
                                <img src="/bau-de-tesouro.png" alt="outros" className="invert h-7 w-7 mt-1" />
                                <div className="flex flex-col">
                                    <h3 className="font-bold">Outros</h3>
                                    <p>Itens extras e melhorias para sua experiência</p>
                                </div>
                            </div>

                            {/* UNBAN */}
                            <div className="flex flex-row items-center gap-2">
                                <img src="/escudo.png" alt="Perder Banimento" className="invert h-7 w-7 mt-1" />
                                <div className="flex flex-col">
                                    <h3 className="font-bold">UnBan</h3>
                                    <p>Recupere seu acesso e volte a jogar sem complicações</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* SMP COR É BLUE-500*/}
                <div className="flex flex-col">
                    <button onClick={() => AbrirTabela("smp")} className="border-t-4 border-t-blue-500 bg-[#140b2b] items-center justify-center p-4 text-xl font-sans rounded-xl hover:scale-110 duration-400 transition-all cursor-pointer">
                        <div className="flex flex-row items-center justify-center gap-6">
                            <img src="/no-mundo-todo.png" alt="icone de mundo" className="h-4 w-4 filter-[invert(42%)_sepia(90%)_saturate(500%)_hue-rotate(190deg)]" />
                            <h2 className="font-bold">SMP</h2>
                        </div>
                        <h3 className="flex items-center justify-center text-xs text-gray-400">Evolua, upar e seja o melhor.</h3>
                        <div className="flex items-center justify-center mt-2">
                            <img src="/sinal-de-seta-para-baixo-para-navegar.png" alt="seta" className={`h-4 w-4 invert transition-transform duration-300 ${aberto === "smp" ? "rotate-180" : ""}`} />
                        </div>

                        {/* TELA ABERTA */}
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out border-b-2 border-b-blue-500 rounded-xl ${aberto === "smp" ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                        <div className="bg-[#140b2b] rounded-xl p-4 text-sm text-gray-300 flex flex-col gap-2">

                            {/* RANKS */}
                            <div className="flex flex-row items-center gap-2 border-b-blue-500 border-2 border-transparent pb-2">
                                <img src="/rank.png" alt="RankUper" className="invert h-7 w-7 mt-1" />
                                <div className="flex flex-col">

                                    <h3 className="font-bold">Ranks</h3>
                                    <p>Evolua seus status e ganhe beneficios exclusivos.</p>
                                </div>
                            </div>

                            {/* KITS */}
                            <div className="flex flex-row items-center gap-2 border-b-blue-500 border-2 border-transparent pb-2">
                                <img src="/pacote.png" alt="pacotes KIT" className="invert h-7 w-7 mt-1" />
                                <div className="flex flex-col">

                                    <h3 className="font-bold">KITs</h3>
                                    <p>Kits especiais para te ajudar na sua jornada</p>
                                </div>
                            </div>


                            {/* CELESTIUNS COINS */}
                            <div className="flex flex-row items-center gap-2 border-b-blue-500 border-2 border-transparent pb-2">
                                <img src="/cifrao.png" alt="celestiun coin" className="invert h-7 w-7 mt-1" />
                                <div className="flex flex-col">
                                    <h3 className="font-bold">Celestiuns</h3>
                                    <p>Moeda exclusiva do servidor para diversas utilidades</p>
                                </div>
                            </div>

                            {/* OUTROS */}
                            <div className="flex flex-row items-center gap-2 border-b-blue-500 border-2 border-transparent pb-2">
                                <img src="/bau-de-tesouro.png" alt="outros" className="invert h-7 w-7 mt-1" />
                                <div className="flex flex-col">
                                    <h3 className="font-bold">Outros</h3>
                                    <p>Itens extras e melhorias para sua experiência</p>
                                </div>
                            </div>

                            {/* UNBAN */}
                            <div className="flex flex-row items-center gap-2">
                                <img src="/escudo.png" alt="Perder Banimento" className="invert h-7 w-7 mt-1" />
                                <div className="flex flex-col">
                                    <h3 className="font-bold">UnBan</h3>
                                    <p>Recupere seu acesso e volte a jogar sem complicações</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* RANKUP COR É AMBER-500 */}
                <div className="flex flex-col">
                    <button onClick={() => AbrirTabela("rankup")} className="border-t-4 border-t-amber-500 bg-[#140b2b] items-center justify-center p-4 text-xl font-sans rounded-xl hover:scale-110 duration-400 transition-all cursor-pointer">
                        <div className="flex flex-row items-center justify-center gap-6">
                            <img src="/setas-para-cima.png" alt="icone de Levelup" className="h-4 w-4 filter-[invert(80%)_sepia(80%)_saturate(500%)_hue-rotate(10deg)]" />
                            <h2 className="font-bold">RankUP</h2>
                        </div>
                        <h3 className="flex items-center justify-center text-xs text-gray-400">Evolua, upar e seja o melhor.</h3>
                        <div className="flex items-center justify-center mt-2">
                            <img src="/sinal-de-seta-para-baixo-para-navegar.png" alt="seta" className={`h-4 w-4 invert transition-transform duration-300 ${aberto === "rankup" ? "rotate-180" : ""}`} />
                        </div>

                        {/* TELA ABERTA */}
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out border-b-2 border-b-amber-500 rounded-xl  ${aberto === "rankup" ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                        <div className="bg-[#140b2b] rounded-xl p-4 text-sm text-gray-300 flex flex-col gap-2">

                            {/* CELESTIUNS COINS */}
                            <div className="flex flex-row items-center gap-2 border-b-amber-500 border-2 border-transparent pb-2">
                                <img src="/cifrao.png" alt="celestiun coin" className="invert h-7 w-7 mt-1" />
                                <div className="flex flex-col">
                                    <h3 className="font-bold">Celestiuns</h3>
                                    <p>Moeda exclusiva do servidor para diversas utilidades</p>
                                </div>
                            </div>

                            {/* OUTROS */}
                            <div className="flex flex-row items-center gap-2 border-b-amber-500 border-2 border-transparent pb-2">
                                <img src="/bau-de-tesouro.png" alt="outros" className="invert h-7 w-7 mt-1" />
                                <div className="flex flex-col">
                                    <h3 className="font-bold">Outros</h3>
                                    <p>Itens extras e melhorias para sua experiência</p>
                                </div>
                            </div>

                            {/* UNBAN */}
                            <div className="flex flex-row items-center gap-2">
                                <img src="/escudo.png" alt="Perder Banimento" className="invert h-7 w-7 mt-1" />
                                <div className="flex flex-col">
                                    <h3 className="font-bold">UnBan</h3>
                                    <p>Recupere seu acesso e volte a jogar sem complicações</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* BOXPVP COR É ROSE-500*/}
                <div className="flex flex-col">
                    <button onClick={() => AbrirTabela("boxpvp")} className="border-t-4 border-t-rose-500 bg-[#140b2b] items-center justify-center p-4 text-xl font-sans rounded-xl hover:scale-110 duration-400 transition-all cursor-pointer">
                        <div className="flex flex-row items-center justify-center gap-6">
                            <img src="/espadas.png" alt="icone de espada" className="h-4 w-4 filter-[invert(40%)_sepia(80%)_saturate(500%)_hue-rotate(320deg)]" />
                            <h2 className="font-bold">BoxPVP</h2>
                        </div>
                        <h3 className="flex items-center justify-center text-xs text-gray-400">PvP rápido, justo e intenso.</h3>
                        <div className="flex items-center justify-center mt-2">
                            <img src="/sinal-de-seta-para-baixo-para-navegar.png" alt="seta" className={`h-4 w-4 invert transition-transform duration-300 ${aberto === "boxpvp" ? "rotate-180" : ""}`} />
                        </div>
                    </button>
                    {/* TELA ABERTA */}

                    <div className={`overflow-hidden transition-all duration-500 ease-in-out border-b-2 border-b-rose-500 rounded-xl ${aberto === "boxpvp" ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                        <div className="bg-[#140b2b] rounded-xl p-4 text-sm text-gray-300 flex-col gap-4 flex">

                            {/* VIPS */}
                            <div className="flex flex-row items-center gap-2 border-b-rose-500 border-2 border-transparent pb-2">
                                <img src="/coroa.png" alt="coroa VIP" className="invert h-7 w-7 mt-1" />
                                <div className="flex flex-col">
                                    <h3 className="font-bold">Vips</h3>
                                    <p>Benefícios incríveis para destacar sua jornada</p>
                                </div>
                            </div>

                            {/* KITS */}
                            <div className="flex flex-row items-center gap-2 border-b-rose-500 border-2 border-transparent pb-2">
                                <img src="/pacote.png" alt="pacotes KIT" className="invert h-7 w-7 mt-1" />
                                <div className="flex flex-col">

                                    <h3 className="font-bold">KITs</h3>
                                    <p>Kits especiais para te ajudar na sua jornada</p>
                                </div>
                            </div>

                            {/* CELESTIUNS COINS */}
                            <div className="flex flex-row items-center gap-2 border-b-rose-500 border-2 border-transparent pb-2">
                                <img src="/cifrao.png" alt="celestiun coin" className="invert h-7 w-7 mt-1" />
                                <div className="flex flex-col">
                                    <h3 className="font-bold">Celestiuns</h3>
                                    <p>Moeda exclusiva do servidor para diversas utilidades</p>
                                </div>
                            </div>

                            {/* OUTROS */}
                            <div className="flex flex-row items-center gap-2 border-b-rose-500 border-2 border-transparent pb-2">
                                <img src="/bau-de-tesouro.png" alt="outros" className="invert h-7 w-7 mt-1" />
                                <div className="flex flex-col">
                                    <h3 className="font-bold">Outros</h3>
                                    <p>Itens extras e melhorias para sua experiência</p>
                                </div>
                            </div>

                            {/* UNBAN */}
                            <div className="flex flex-row items-center gap-2">
                                <img src="/escudo.png" alt="Perder Banimento" className="invert h-7 w-7 mt-1" />
                                <div className="flex flex-col">
                                    <h3 className="font-bold">UnBan</h3>
                                    <p>Recupere seu acesso e volte a jogar sem complicações</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
