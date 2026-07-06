import Link from "next/link";

export default function HeaderLojaCelestium() {
    return (
        // TELA BACKGROUND
            <div className="w-full flex bg-[url('/bg-server.png')] bg-cover bg-center p-20 px-40">
            {/* TELA HOME WRAPPER */}
            <div className=" flex flex-col items-start justify-center">

                {/* SLOGAN HOME */}
                <h1 className="text-white text-6xl font-bold">A loja oficial do</h1>
                <span className="bg-linear-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent text-6xl font-bold">
                    CelestiumMC
                </span>
                <h2 className="text-gray-400 text-xl font-medium mt-6">
                    Adquira itens, ranks e benefícios exclusivos em nossos modos de jogo e
                </h2>
                <h2 className="text-gray-400 text-xl font-medium">
                    evolua sua experiência dentro do servidor.
                </h2>

                {/* BOTOES DE INFORMAÇÃO HOME */}
                <div className="flex flex-row items-center justify-center gap-6">

                    {/* DISCORD BUTTON */}
                    <Link href="https://discord.com/">
                        <button
                            className="bg-purple-500 hover:bg-purple-600 text-white font-bold flex items-center py-3 px-6 rounded-md mt-6 gap-4 cursor-pointer hover:scale-105 duration-500 transition-all">
                            <img src="/Discord.png" className="w-8 h-8 invert" alt="Discord" />
                            Entrar no Discord
                        </button>
                    </Link>

                    {/* LOJA BUTTON */}
                    <Link href="/celestium/loja">
                        <button className="bg-[#13092A] hover:bg-[#1c0e3d] border border-purple-900 text-white font-bold py-4 px-6 rounded-md mt-6 flex items-center justify-center gap-6 cursor-pointer hover:scale-105 duration-500 transition-all">
                            <img
                                src="/cesta-de-compras.png"
                                className="w-6 h-6 filter-[invert(40%)_sepia(80%)_saturate(500%)_hue-rotate(240deg)]"
                                alt="Loja"
                            />
                            Acessar Loja
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
}