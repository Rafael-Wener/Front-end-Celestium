"use client";

import { useState } from "react";

export default function CriarProduto() {
  // Estado básico para alimentar o Live Preview em tempo real
  const [formData, setFormData] = useState({
    nome: "Vip Imperador",
    preco: "49.90",
    categoria: "Ranks",
    modo: "Global",
    descricao: "Vip Lord com itens dentro do jogo e tag especial",
    imagem: "/bau-de-tesouro.png",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_400px] bg-[#0a0516] p-1 text-white min-h-screen">
      
      {/* COLUNA ESQUERDA: FORMULÁRIO */}
      <div className="rounded-xl border border-purple-950/40 bg-[#130d24]/40 p-6 md:p-8 shadow-xl h-fit">
        <div className="mb-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400">
            // GERENCIAMENTO
          </span>
          <h2 className="text-2xl font-bold mt-1 text-white">Cadastrar Novo Produto</h2>
          <p className="text-sm text-neutral-400 mt-1">
            Preencha os campos para ver a renderização do card em tempo real.
          </p>
        </div>

        <div className="space-y-6">
          {/* Nome do Produto */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wide text-neutral-400">Nome do Produto</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Ex: VIP Celestial, 5000 Cash..."
              className="w-full rounded-md border border-purple-950/60 bg-[#0c061a] px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-purple-500"
            />
          </div>

          {/* Categoria e Modo */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wide text-neutral-400">Categoria</label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="w-full rounded-md border border-purple-950/60 bg-[#0c061a] px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500 cursor-pointer"
              >
                <option value="Ranks">Ranks</option>
                <option value="Moedas">Moedas</option>
                <option value="Kits">Kits</option>
                <option value="Extras">Extras</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wide text-neutral-400">Modo / Servidor</label>
              <select
                name="modo"
                value={formData.modo}
                onChange={handleChange}
                className="w-full rounded-md border border-purple-950/60 bg-[#0c061a] px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500 cursor-pointer"
              >
                <option value="Global">Global</option>
                <option value="RankUP">RankUP</option>
                <option value="FullPvP">FullPvP</option>
                <option value="SkyWars">SkyWars</option>
              </select>
            </div>
          </div>

          {/* Preço e URL da Imagem */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wide text-neutral-400">Preço (R$)</label>
              <input
                type="text"
                name="preco"
                value={formData.preco}
                onChange={handleChange}
                placeholder="Ex: 49.90"
                className="w-full rounded-md border border-purple-950/60 bg-[#0c061a] px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-purple-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wide text-neutral-400">Ícone (URL ou Caminho)</label>
              <input
                type="text"
                name="imagem"
                value={formData.imagem}
                onChange={handleChange}
                placeholder="Ex: /bau-de-tesouro.png"
                className="w-full rounded-md border border-purple-950/60 bg-[#0c061a] px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-purple-500"
              />
            </div>
          </div>

          {/* Descrição */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wide text-neutral-400">Descrição dos Benefícios</label>
            <textarea
              name="descricao"
              rows={4}
              value={formData.descricao}
              onChange={handleChange}
              placeholder="Descreva o que o pacote oferece..."
              className="w-full rounded-md border border-purple-950/60 bg-[#0c061a] px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-purple-500 resize-none"
            />
          </div>

          {/* Botão Salvar */}
          <button
            type="button"
            className="w-full rounded-md bg-purple-600 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-purple-700 shadow-[0_4px_15px_rgba(147,51,234,0.2)] cursor-pointer"
          >
            Salvar Produto
          </button>
        </div>
      </div>

      {/* COLUNA DIREITA: NOVO LIVE PREVIEW (IDÊNTICO À IMAGEM) */}
      <div className="flex flex-col gap-4">
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 px-1">
          Visualização na Loja
        </span>
        
        {/* Card do Produto */}
        <div className="w-full max-w-[360px] rounded-[24px] border border-purple-500/20 bg-white p-0 text-slate-900 shadow-[0_12px_32px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col transition-all duration-300">
          
          {/* Parte Superior: Gradiente Roxo com Ícone */}
          <div className="relative w-full h-[190px] bg-gradient-to-b from-[#4c248c] to-[#8044e4] flex items-center justify-center p-6">
            {/* Badge: Mais Pedido */}
            <div className="absolute top-4 right-4 rounded-full bg-white px-3 py-1 text-[10px] font-black text-[#8044e4] uppercase tracking-wide shadow-sm">
              Mais Pedido
            </div>

            {/* Baú/Ícone Centralizado Grande */}
            <div className="w-24 h-24 flex items-center justify-center opacity-90">
              <img
                src={formData.imagem || "/bau-de-tesouro.png"}
                alt="Ícone"
                className="w-full h-full object-contain filter brightness-0" 
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'><path d='M3 3h18v4H3zm0 6h18v11H3zm2 2v7h14v-7z'/></svg>";
                }}
              />
            </div>
          </div>

          {/* Parte Inferior: Conteúdo do Produto */}
          <div className="p-6 flex flex-col flex-1 bg-white">
            {/* Nome do Produto */}
            <h3 className="text-[25px] font-black text-[#140b2b] tracking-tight leading-none">
              {formData.nome || "Nome do Produto"}
            </h3>

            {/* Descrição */}
            <p className="mt-3 text-sm font-semibold text-gray-400 leading-relaxed min-h-[48px] line-clamp-2 break-words">
              {formData.descricao || "Descrição do produto..."}
            </p>

            {/* Container de Preço e Meta */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Preço
                </span>
                <strong className="text-[28px] font-black text-[#8044e4] leading-tight">
                  R$ {formData.preco || "0,00"}
                </strong>
              </div>

              {/* Badge Amarela de Pontos/Destaque */}
              <div className="flex items-center gap-1 rounded-full bg-[#fef9c3] px-3 py-1.5 text-xs font-black text-[#854d0e]">
                <span className="text-[#eab308]">★</span> 10
              </div>
            </div>

            {/* Botão Adicionar ao carrinho */}
            <button
              type="button"
              className="mt-6 w-full rounded-xl bg-[#b500e6] py-3.5 text-sm font-extrabold text-white transition-all duration-200 hover:bg-[#a000cc] active:scale-[0.98] shadow-[0_4px_12px_rgba(181,0,230,0.2)] text-center cursor-default"
            >
              Adicionar ao carrinho
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}