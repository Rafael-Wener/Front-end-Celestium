import Link from "next/link";

export default function FooterCeslestium() {
    return (
        // TELA WRAPPER E BACKGROUND
        <div className="flex flex-col w-full bg-black h-80 justify-center px-40">

            {/* LINHA PRINCIPAL - ESQUERDA E DIREITA */}
            <div className="flex flex-row items-start justify-between w-full">

                {/* LADO ESQUERDO */}
                <div className="flex flex-col items-start justify-center">
                    {/* CELESTIUM SERVIÇOS */}
                    <div className="flex flex-row items-center justify-center">
                        <img src="/logoCeslestiumtrue.png" alt="logo Celestium" className="h-10 w-10 mr-2 rounded-md" />
                        <h1 className="flex font-bold">Celestium</h1>
                        <span className="font-bold text-purple-500">MC</span>
                    </div>

                    {/* SERVIÇOS */}
                    <div className="flex flex-col justify-center items-start mt-4">
                        <h1 className="text-gray-400 text-sm">A melhor experiência Minecraft você encontra aqui. Junte-se a
                            <br />
                            <span> nós e comece sua jornada hoje mesmo.</span></h1>
                    </div>

                    <div className="flex flex-row items-center justify-center gap-6 mt-4">
                        {/* ICONES/DISCORD */}
                        <Link href="https://discord.gg/MF2m9DE8s">
                            <button className="flex items-center justify-center bg-purple-950/60 w-8 h-8 rounded-md mt-2 hover:bg-purple-800 transition-all duration-300 hover:scale-110 cursor-pointer">
                                <img src="/Discord.png" alt="Discord" className="invert w-6 h-6" />
                            </button>
                        </Link>

                        {/* ICONES/INSTAGRAM */}
                        <Link href="https://www.instagram.com/celestiummc?igsh=MTBydGh1Ymd1bzBxcQ==">
                            <button className="flex items-center justify-center bg-purple-950/60 w-8 h-8 rounded-md mt-2 hover:bg-purple-800 transition-all duration-300 hover:scale-110 cursor-pointer">
                                <img src="/instagram.png" alt="Discord" className="invert w-5 h-5" />
                            </button>
                        </Link>

                        {/* ICONES/TIK TOK */}
                        <Link href="https://www.tiktok.com/@celestium.mc3?_r=1&_t=ZS-97IL9lCHUIL">
                            <button className="flex items-center justify-center bg-purple-950/60 w-8 h-8 rounded-md mt-2 hover:bg-purple-800 transition-all duration-300 hover:scale-110 cursor-pointer">
                                <img src="/tik-tok.png" alt="Discord" className="invert w-5 h-5" />
                            </button>
                        </Link>
                    </div>
                </div>

                {/* LADO DIREITO DO FOOTER//PRECISA SER FEITO A INTEGRAÇÃO E ANIMAÇÃO DAS FUNÇÕES */}
                {/* PARTE DA NAVEGAÇÃO DO FOTTER */}
                <div className="flex flex-row gap-80 ">
                    <div className="flex items-start justify-center flex-col gap-4">
                        {/* TITULO NAVEGAÇÃO */}
                        <div className="font-bold font-sans text-sm i">NAVEGAÇÃO</div>
                        {/* SUBCONTEUDOS */}
                        <div className="flex flex-col items-start justify-center gap-2 text-xs text-gray-400">
                            <button className="hover:text-purple-400/90 cursor-pointer">Início</button>
                            <Link href="/celestium/loja">
                                <button className="hover:text-purple-400/90 cursor-pointer">Loja</button>
                            </Link>
                            <button className="hover:text-purple-400/90 cursor-pointer">Modos</button>
                            <Link href="https://discord.gg/MF2m9DE8s">
                                <button className="hover:text-purple-400/90 cursor-pointer">Discord</button>
                            </Link>
                        </div>
                    </div>

                    {/* PARTE DAS INFORMAÇÕES DO FOOTER */}
                    <div className="flex flex-row gap-80 ">
                        <div className="flex items-start justify-center flex-col gap-4">
                            <div className="font-bold font-sans text-sm i">INFORMAÇÕES</div>
                            <div className="flex flex-col items-start justify-center gap-2 text-xs text-gray-400 ">
                                <Link href="/celestium">
                                    <button className="hover:text-purple-400/90 cursor-pointer">Termos de Uso</button>
                                </Link>
                                <Link href="">
                                    <button className="hover:text-purple-400/90 cursor-pointer">Política de Privacidade</button>
                                </Link>
                                <button className="hover:text-purple-400/90 cursor-pointer">FAQ</button>
                                <button className="hover:text-purple-400/90 cursor-pointer">Regras</button>
                            </div>
                        </div>
                    </div>

                    {/* PARTE DAS PAGAMENTO DO FOOTER */}
                    <div className="flex flex-row gap-80 ">
                        <div className="flex items-start justify-center flex-col gap-4">
                            <div className="font-bold font-sans text-sm i">PAGAMENTOS</div>
                            <div className="flex flex-row items-start justify-center gap-2 text-xs text-gray-400 ">
                                <img src="/paypal.png" alt="" className="h-8 w-8 cursor-pointer" />
                                <img src="/visa.png" alt="" className="h-8 w-8 cursor-pointer" />
                                <img src="/cartao.png" alt="" className="h-6 w-10 cursor-pointer" />
                            </div>
                            <div className="border border-purple-900 rounded-md gap-2 bg-purple-950/60 p-2 text-xs">
                                <h3 className="font-bold text-xs text-gray-400">COMPRA 100% SEGURA</h3>
                                <span className="text-xs text-gray-400">Seus dados sempre protegidos
                                    <br /> através de criptografia.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* COPYRIGHT - EMBAIXO */}
            <div className="flex w-full items-center justify-center mt-10">
                <div className="text-gray-500 text-xs">© 2026 CelestiumMC. Todos os direitos reservados. Desenvolvido para máxima fidelidade visual.</div>
            </div>
        </div>
    )
}