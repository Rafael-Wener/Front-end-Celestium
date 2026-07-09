"use client";

import { useEffect, useState } from "react";

interface Categoria {
  id: string;
  label: string;
}

export default function Produto() {
  // Estados do formulário
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState("/produtos/VipImperador.png"); // Padrão inicial
  const [tag, setTag] = useState("");

  // Estados de controle
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregandoCategorias, setCarregandoCategorias] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });

  // Lista fixa de imagens disponíveis na sua pasta public/produtos
  const opcoesImagens = [
    { url: "/produtos/VipImperador.png", label: "VIP Imperador" },
    { url: "/produtos/VipLorde.png", label: "VIP Lorde" },
    { url: "/produtos/VipNobre.png", label: "VIP Nobre" },
    { url: "/produtos/ChaveComum.png", label: "Chave Comum" },
    { url: "/produtos/ChaveEpica.png", label: "Chave Épica" },
    { url: "/produtos/ChaveLendaria.png", label: "Chave Lendária" },
    { url: "/produtos/ChaveRara.png", label: "Chave Rara" },
    { url: "/produtos/Coin1500.png", label: "1.500 Coins" },
    { url: "/produtos/Coin3000.png", label: "3.000 Coins" },
    { url: "/produtos/Coin4500.png", label: "4.500 Coins" },
    { url: "/produtos/Coin7500.png", label: "7.500 Coins" },
    { url: "/produtos/Coin15000.png", label: "15.000 Coins" },
    { url: "/produtos/Coin25000.png", label: "25.000 Coins" },
  ];

  // Carrega as categorias do banco de dados dinamicamente
  async function carregarCategorias() {
    const token = localStorage.getItem("token");
    try {
      setCarregandoCategorias(true);
      const res = await fetch("http://localhost:3005/categories", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setCategorias(data);
      } else {
        setMensagem({ tipo: "erro", texto: "Não foi possível carregar as categorias." });
      }
    } catch (err) {
      console.error(err);
      setMensagem({ tipo: "erro", texto: "Erro de conexão ao buscar categorias." });
    } finally {
      setCarregandoCategorias(false);
    }
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  // Envio do formulário para criar o produto no Backend
  async function handleCriarProduto(e: React.FormEvent) {
    e.preventDefault();
    setMensagem({ tipo: "", texto: "" });

    // Validações básicas antes de enviar
    if (!name.trim() || !description.trim() || !price || !categoryId) {
      setMensagem({ tipo: "erro", texto: "Por favor, preencha todos os campos obrigatórios!" });
      return;
    }

    const token = localStorage.getItem("token");
    setSalvando(true);

    try {
      const res = await fetch("http://localhost:3005/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price) || 0,
          image,
          categoryId,
          tag: tag.trim() !== "" ? tag : null,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensagem({ tipo: "sucesso", texto: `Produto "${name}" cadastrado com sucesso!` });
        
        // Limpa os campos do formulário pós-cadastro bem-sucedido
        setName("");
        setDescription("");
        setPrice("");
        setCategoryId("");
        setImage("/produtos/VipImperador.png");
        setTag("");
      } else {
        setMensagem({ tipo: "erro", texto: data.message || "Erro ao criar o produto no servidor." });
      }
    } catch (err) {
      console.error(err);
      setMensagem({ tipo: "erro", texto: "Erro crítico de conexão com o backend." });
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="max-w-3xl bg-[#0a0516] text-white p-1 min-h-screen">
      
      {/* CABEÇALHO DA TELA */}
      <div className="mb-6">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400">
          // ADMINISTRAÇÃO CELESTIUM
        </span>
        <h2 className="text-2xl font-bold mt-1 text-white">Cadastrar Novo Produto</h2>
        <p className="text-sm text-neutral-400 mt-1">
          Adicione novos pacotes, moedas ou vantagens que ficarão visíveis imediatamente na loja.
        </p>
      </div>

      {/* FORMULÁRIO COM DESIGN GLASSMORPHISM */}
      <div className="rounded-xl border border-purple-950/40 bg-[#130d24]/40 p-6 md:p-8 shadow-xl">
        <form onSubmit={handleCriarProduto} className="space-y-5">
          
          {/* CAMPO: NOME DO PRODUTO */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wide text-neutral-400">Nome do Produto *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: VIP Imperador - 30 Dias"
              className="w-full rounded-md border border-purple-950/60 bg-[#0c061a] px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* CAMPO DINÂMICO: CATEGORIA COLETADA DO BANCO */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wide text-neutral-400">Categoria *</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                disabled={carregandoCategorias}
                className="w-full rounded-md border border-purple-950/60 bg-[#0c061a] px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500 cursor-pointer disabled:opacity-50"
              >
                <option value="" className="text-neutral-600">
                  {carregandoCategorias ? "Carregando categorias..." : "Selecione uma categoria"}
                </option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-[#110a22] text-white">
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* CAMPO: SELETOR DE ÍCONES */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wide text-neutral-400">Ícone Ilustrativo *</label>
              <select
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full rounded-md border border-purple-950/60 bg-[#0c061a] px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500 cursor-pointer"
              >
                {opcoesImagens.map((opt) => (
                  <option key={opt.url} value={opt.url} className="bg-[#110a22] text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* CAMPO: PREÇO */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wide text-neutral-400">Preço Venda (R$) *</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full rounded-md border border-purple-950/60 bg-[#0c061a] px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-purple-500"
              />
            </div>

            {/* CAMPO: TAG PROMOCIONAL */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wide text-neutral-400">Tag Promocional (Opcional)</label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Ex: +20% OFF, RECOMENDADO"
                className="w-full rounded-md border border-purple-950/60 bg-[#0c061a] px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-purple-500"
              />
            </div>
          </div>

          {/* CAMPO: DESCRIÇÃO DETALHADA */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wide text-neutral-400">Descrição do Produto *</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva as vantagens, itens incluídos e comandos adicionados por este pacote de forma detalhada..."
              className="w-full rounded-md border border-purple-950/60 bg-[#0c061a] px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-purple-500 resize-none"
            />
          </div>

          {/* MENSAGENS DE FEEDBACK */}
          {mensagem.texto && (
            <div className={`text-sm rounded-xl px-4 py-3 border ${
              mensagem.tipo === "sucesso" 
                ? "bg-green-500/10 border-green-500/20 text-green-400" 
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}>
              {mensagem.texto}
            </div>
          )}

          {/* BOTÃO DE ENVIO */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={salvando || carregandoCategorias}
              className="w-full sm:w-auto rounded-md bg-purple-600 px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-purple-700 shadow-[0_4px_15px_rgba(147,51,234,0.3)] disabled:opacity-50 cursor-pointer"
            >
              {salvando ? "Cadastrando no banco..." : "Salvar Produto"}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}