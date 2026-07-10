"use client";

import { useEffect, useState } from "react";

interface Categoria {
  id: string;
  label: string;
}

// 📂 LISTA DE FOTOS DA SUA PASTA public/produtos
const IMAGENS_DISPONIVEIS = [
  "ChaveComum.png",
  "ChaveEpica.png",
  "ChaveLendaria.png",
  "ChaveRara.png",
  "Coin1500.png",
  "Coin3000.png",
  "Coin4500.png",
  "Coin7500.png",
  "Coin15000.png",
  "Coin25000.png",
  "VipImperador.png",
  "VipLord.png",
  "VipNobre.png",
];

export default function Produto() {
  // Estados do formulário
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(IMAGENS_DISPONIVEIS[0]); // Começa selecionando a primeira foto
  const [tag, setTag] = useState("");
  const [command, setCommand] = useState(""); // Mantém a string limpa digitada pelo usuário

  // Estados de controle
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregandoCategorias, setCarregandoCategorias] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });

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
        if (data.length > 0) {
          setCategoryId(data[0].id); // Seleciona a primeira categoria por padrão
        }
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
    if (!name.trim() || !description.trim() || !price || !categoryId || !image) {
      setMensagem({ tipo: "erro", texto: "Por favor, preencha todos os campos obrigatórios!" });
      return;
    }

    const token = localStorage.getItem("token");
    setSalvando(true);

    // 💡 FORMATADO PARA O PADRÃO QUE SEU BACKEND/PRISMA ESPERA (ARRAY JSON)
    const comandoFormatadoJSON = command.trim() !== "" 
      ? JSON.stringify([command.trim()]) 
      : JSON.stringify([]);

    // Envia apontando diretamente para o caminho relativo público da sua pasta
    const caminhoCompletoImagem = `/produtos/${image}`;

    try {
      const res = await fetch("http://localhost:3005/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          price: parseFloat(price),
          tag: tag.trim() !== "" ? tag.trim() : null,
          minecraftCommands: comandoFormatadoJSON, // 👈 Agora mapeando para a propriedade certa do Prisma
          categoryId: categoryId,
          image: caminhoCompletoImagem, // 👈 Salvando a string limpa /produtos/nome.png
          available: true,
          rating: 0.0
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensagem({ tipo: "sucesso", texto: `Produto "${name}" cadastrado com sucesso!` });

        // Limpa os campos do formulário pós-cadastro bem-sucedido
        setName("");
        setDescription("");
        setPrice("");
        setTag("");
        setCommand("");
        setImage(IMAGENS_DISPONIVEIS[0]);
      } else {
        setMensagem({ tipo: "erro", texto: data.error || "Erro ao criar o produto no servidor." });
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
              required
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
                required
              >
                <option value="" className="text-neutral-600" disabled>
                  {carregandoCategorias ? "Carregando categorias..." : "Selecione uma categoria"}
                </option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-[#110a22] text-white">
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* SELETOR DE IMAGEM DA PASTA PUBLIC (RESTAURADO) */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wide text-neutral-400">Ícone Ilustrativo *</label>
              <div className="flex gap-3 items-center">
                <select
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="flex-1 rounded-md border border-purple-950/60 bg-[#0c061a] px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500 cursor-pointer"
                  required
                >
                  {IMAGENS_DISPONIVEIS.map((img) => (
                    <option key={img} value={img} className="bg-[#110a22] text-white">
                      {img}
                    </option>
                  ))}
                </select>

                {/* Box de Preview Visual do arquivo dentro da pasta public/produtos */}
                <div className="w-[46px] h-[46px] rounded-md border border-purple-950 bg-[#0c061a] p-1.5 flex items-center justify-center shrink-0">
                  <img 
                    src={`/produtos/${image}`} 
                    alt="Preview" 
                    className="max-h-full max-w-full object-contain" 
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} 
                  />
                </div>
              </div>
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
                required
              />
            </div>

            {/* CAMPO: TAG */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wide text-neutral-400">Tag (Opcional)</label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Ex: Em alta"
                className="w-full rounded-md border border-purple-950/60 bg-[#0c061a] px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-purple-500"
              />
            </div>
          </div>

          {/* CAMPO: COMANDO DO MINECRAFT */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase text-neutral-400 tracking-wide">
              Comando Executável (Minecraft)
            </label>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Ex: give {player} diamond 64 ou ppoint give {player} 500"
              className="w-full rounded-md border border-purple-950/60 bg-[#0c061a] px-4 py-3 text-sm text-purple-300 outline-none transition focus:border-purple-500 font-mono"
            />
            <span className="text-[10px] text-neutral-500 italic">
              Use <code className="text-purple-400 font-bold">{`{player}`}</code> para identificar automaticamente o nick de quem comprou.
            </span>
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
              required
            />
          </div>

          {/* MENSAGENS DE FEEDBACK */}
          {mensagem.texto && (
            <div className={`text-sm rounded-xl px-4 py-3 border ${mensagem.tipo === "sucesso"
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