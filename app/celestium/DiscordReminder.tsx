export default function DiscordBannerCelestium() {
    return (
        <div className="bg-white flex flex-col w-full items-start px-40 py-16">

            {/* Discord Banner */}
            <div className="relative flex w-full bg-[#140b2b] rounded-2xl shadow-[2px_2px_10px_2px] shadow-black overflow-hidden min-h-35 items-center justify-center mt-15">

                {/* Glow central de fundo */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-125 h-32 bg-purple-700/20 rounded-full blur-3xl" />
                </div>

                {/* Conteúdo central */}
                <div className="relative z-10 flex flex-col items-center text-center py-10 px-8">

                    {/* Label superior */}
                    <p className="text-purple-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                        • Faça parte da nossa comunidade •
                    </p>

                    {/* Título */}
                    <h2 className="text-white font-bold text-3xl mb-3">
                        Entre no Discord e conecte-se!
                    </h2>

                    {/* Subtítulo */}
                    <p className="text-gray-400 text-sm mb-6 max-w-md">
                        Participe de eventos, sorteios, novidades e converse com nossa comunidade incrível.
                    </p>

                    {/* Botão Discord */}
                    <a href="https://discord.gg/MF2m9DE8s">
                    <div className="flex items-center justify-center gap-6 bg-purple-700 px-6 py-3 rounded-md font-sans cursor-pointer hover:bg-purple-700 transition-all duration-300 hover:scale-105">
                        <img src="/Discord.png" alt="" className="h-9 w-9 invert" />
                        <span className="font-bold whitespace-nowrap">Entrar no Discord</span>
                        <img src="/seta-direita.png" alt="" className="h-3 w-3 invert" />
                    </div>
                    </a>
                </div>
            </div>
        </div>
    )
}