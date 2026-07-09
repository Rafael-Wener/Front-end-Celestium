"use client";

import { useEffect, useState, useRef } from "react";

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
  const [image, setImage] = useState(""); // Começa vazio para o upload obrigatório
  const [tag, setTag] = useState("");

  // Estados de controle
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregandoCategorias, setCarregandoCategorias] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });
  
  // Estado para controlar o visual do "Arrastar arquivo"
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Função utilitária para converter arquivo em String Base64
  const processarArquivoDeImagem = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setMensagem({ tipo: "erro", texto: "Por favor, selecione apenas arquivos de imagem (PNG, JPG, WEBP)." });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result); // Define a string Base64 no estado da imagem
        setMensagem({ tipo: "", texto: "" }); // Limpa erros prévios se houver
      }
    };
    reader.readAsDataURL(file);
  };

  // Eventos de Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processarArquivoDeImagem(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processarArquivoDeImagem(e.target.files[0]);
    }
  };

  // Envio do formulário para criar o produto no Backend
  async function handleCriarProduto(e: React.FormEvent) {
    e.preventDefault();
    setMensagem({ tipo: "", texto: "" });

    // Validações básicas antes de enviar
    if (!name.trim() || !description.trim() || !price || !categoryId || !image) {
      setMensagem({ tipo: "erro", texto: "Por favor, preencha todos os campos obrigatórios e envie um ícone!" });
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
          image, // Envia a string Base64 gerada
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
        setImage("");
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

            {/* NOVO CAMPO: ÁREA DE UPLOAD DRAG AND DROP */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wide text-neutral-400">Ícone Ilustrativo *</label>
              
              {/* Input escondido nativo */}
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              {/* Box interativo visual */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`w-full rounded-md border-2 border-dashed px-4 py-2.5 text-sm flex items-center justify-between cursor-pointer transition h-[46px] ${
                  isDragging 
                    ? "border-purple-400 bg-purple-950/20" 
                    : image 
                      ? "border-green-600/50 bg-green-950/5" 
                      : "border-purple-950/60 bg-[#0c061a] hover:border-purple-800"
                }`}
              >
                <div className="flex items-center gap-2 truncate max-w-[80%]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 flex-shrink-0 ${image ? "text-green-400" : "text-neutral-500"}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <span className={`truncate text-xs ${image ? "text-green-400 font-medium" : "text-neutral-500"}`}>
                    {image ? "Imagem Carregada!" : "Arraste ou clique para enviar"}
                  </span>
                </div>

                {/* Mini Preview se a imagem existir */}
                {image && (
                  <div className="w-7 h-7 rounded border border-purple-950 overflow-hidden bg-[#0a0516] flex-shrink-0">
                    <img src={image} alt="Preview" className="w-full h-full object-contain" />
                  </div>
                )}
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
              />
            </div>

            {/* CAMPO: TAG PROMOCIONAL */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wide text-neutral-400">Tag Opcional)</label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Ex: Em alta"
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