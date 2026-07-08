"use client";

export default function DiscordBannerCelestium() {
    return (
        <div className="w-full bg-[#06020f] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-950/5 via-[#06020f] to-[#06020f] flex flex-col items-center px-6 md:px-12 xl:px-40 py-16 relative overflow-hidden">

            {/* Banner do Discord Estilo Glassmorphism */}
            <div className="relative flex w-full bg-[#0d071f]/40 backdrop-blur-md rounded-2xl border border-purple-500/50 overflow-hidden min-h-[260px] items-center justify-center mt-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">

                {/* Glow de Fundo Avançado (Efeito Nebulosa) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    <div className="w-[500px] h-32 bg-purple-600/10 rounded-full blur-[120px] group-hover:bg-purple-600/15 transition-all duration-700" />
                    <div className="absolute right-10 top-10 w-24 h-24 bg-blue-500/5 rounded-full blur-3xl" />
                </div>

                {/* Conteúdo Central */}
                <div className="relative z-10 flex flex-col items-center text-center py-12 px-6 md:px-12 w-full max-w-2xl">

                    {/* Tag Superior Minimalista */}
                    <p className="text-purple-400 text-[10px] font-black tracking-[0.3em] uppercase mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                        Faça parte da nossa comunidade
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                    </p>

                    {/* Título de Alto Impacto */}
                    <h2 className="text-white font-black text-2xl md:text-3xl mb-3 tracking-tight bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent uppercase">
                        Entre no Discord e Conecte-se!
                    </h2>

                    {/* Subtítulo */}
                    <p className="text-neutral-400 text-xs md:text-sm mb-8 max-w-md font-medium leading-relaxed">
                        Participe de eventos exclusivos, sorteios diários, fique por dentro das novidades e jogue junto com uma comunidade incrível.
                    </p>

                    {/* Botão Discord Estilo Neon Cyberpunk */}
                    <a 
                        href="https://discord.gg/MF2m9DE8s"
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="flex items-center justify-center gap-4 bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-3.5 rounded-xl font-sans text-sm font-black tracking-wide uppercase transition-all duration-300 hover:scale-105 shadow-[0_4px_20px_rgba(88,101,242,0.3)] hover:shadow-[0_0_30px_rgba(88,101,242,0.55)] cursor-pointer"
                    >
                        <img src="/Discord.png" alt="Discord Logo" className="h-5 w-5 invert brightness-200" />
                        <span>Entrar no Discord</span>
                        <img src="/seta-direita.png" alt="Seta" className="h-2.5 w-2.5 invert opacity-80 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </div>
    );
}