import Link from "next/link";

export default function HeaderCelestium() {
  return (
    // TELA BACKGROUND
    <div className="w-full flex items-start px-40 bg-linear-to-b from-purple-950/40 to-black bg-[url('/bg-loja.png')] bg-cover bg-center p-20">

      {/* TELA HOME WRAPPER */}
      <div className=" flex flex-col items-start justify-center">

        {/* SLOGAN HOME */}
        <h1 className="text-white text-6xl font-bold">O site oficial do</h1>
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

        {/* SEÇÃO DE FEATURES DO SITE WRAPPER*/}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-60 mt-16 pt-8 border-t border-purple-950/40">

          {/* AMBIENTE SEGURO */}
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <img className="h-6 w-6 flex flex-row filter-[invert(40%)_sepia(80%)_saturate(500%)_hue-rotate(240deg)]" src="/escudo-de-seguranca.png" alt="icone de segurança" />
            <div className="flex flex-col">
              <h2 className="font-bold">Segurança</h2>
              <span className="text-gray-400 text-xs">Ambiente 100% seguro</span>
            </div>
          </div>
          
          {/* ENTREGA AUMOMATICA */}
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <img className="h-6 w-6 flex flex-row filter-[invert(40%)_sepia(80%)_saturate(500%)_hue-rotate(240deg)]" src="/raio.png" alt="icone de raio" />
            <div className="flex flex-col">
              <h2 className="font-bold">Entrega Automática</h2>
              <span className="text-gray-400 text-xs">Itens entregues na hora</span>
            </div>
          </div>
          
          {/* SUPORTE RAPIDO */}
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <img className="h-6 w-6 flex flex-row filter-[invert(40%)_sepia(80%)_saturate(500%)_hue-rotate(240deg)]" src="/fone-de-ouvido.png" alt="icone de suporte digital" />
            <div className="flex flex-col">
              <h2 className="font-bold">Suporte Rápido</h2>
              <span className="text-gray-400 text-xs">Equipe sempre online</span>
            </div>
          </div>

          {/* PAGAMENTO SEGURO */}
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <img className="h-6 w-6 flex flex-row filter-[invert(40%)_sepia(80%)_saturate(500%)_hue-rotate(240deg)]" src="/cadeado.png" alt="icone e cadeado" />
            <div className="flex flex-col">
              <h2 className="font-bold">Pagamentos Seguros</h2>
              <span className="text-gray-400 text-xs">Compre com confiança</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
