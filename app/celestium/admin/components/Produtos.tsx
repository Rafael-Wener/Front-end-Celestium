"use client";

import { useEffect, useState, useRef } from "react";

interface Categoria {
  id: string;
  label: string;
}

interface Produto {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  tag: string | null;
}

export default function ListarProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });

  // ESTADOS PARA EDIÇÃO
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editTag, setEditTag] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [salvandoEdicao, setSalvandoEdicao] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Carrega produtos e categorias
  async function carregarDados() {
    const token = localStorage.getItem("token");
    try {
      setCarregando(true);
      
      // Busca Categorias
      const resCat = await fetch("http://localhost:3005/categories", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const dataCat = await resCat.json();
      if (resCat.ok) setCategorias(dataCat);

      // Busca Produtos
      const resProd = await fetch("http://localhost:3005/products", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const dataProd = await resProd.json();
      if (resProd.ok) setProdutos(dataProd);

    } catch (err) {
      console.error(err);
      setMensagem({ tipo: "erro", texto: "Erro de conexão ao buscar dados." });
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  // FUNÇÃO: Abre o formulário/modal preenchido com os dados atuais do produto
  function iniciarEdicao(produto: Produto) {
    setProdutoEditando(produto);
    setEditName(produto.name);
    setEditDescription(produto.description);
    setEditPrice(produto.price.toString());
    setEditCategoryId(produto.categoryId);
    setEditImage(produto.image || "");
    setEditTag(produto.tag || "");
  }

  // Conversão de arquivo de imagem para Base64
  const processarImagemEdicao = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") setEditImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // FUNÇÃO: Envia a atualização (PUT) para o Backend
  async function handleSalvarEdicao(e: React.FormEvent) {
    e.preventDefault();
    if (!produtoEditando) return;

    const token = localStorage.getItem("token");
    setSalvandoEdicao(true);

    try {
      const res = await fetch(`http://localhost:3005/products/${produtoEditando.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editName,
          description: editDescription,
          price: parseFloat(editPrice) || 0,
          image: editImage,
          categoryId: editCategoryId,
          tag: editTag.trim() !== "" ? editTag : null,
        }),
      });

      if (res.ok) {
        setProdutos((prev) =>
          prev.map((p) =>
            p.id === produtoEditando.id
              ? { ...p, name: editName, description: editDescription, price: parseFloat(editPrice), image: editImage, categoryId: editCategoryId, tag: editTag.trim() !== "" ? editTag : null }
              : p
          )
        );
        setProdutoEditando(null);
        setMensagem({ tipo: "sucesso", texto: "Produto atualizado com sucesso!" });
      } else {
        setMensagem({ tipo: "erro", texto: "Erro ao salvar alterações no servidor." });
      }
    } catch (err) {
      console.error(err);
      setMensagem({ tipo: "erro", texto: "Erro de conexão ao editar." });
    } finally {
      setSalvandoEdicao(false);
    }
  }

  // FUNÇÃO: Deleta o produto no Backend e remove da tabela
  async function handleDeletarProduto(id: string, nome: string) {
    if (!confirm(`Tem certeza que deseja excluir o produto "${nome}" definitivamente?`)) {
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:3005/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        setProdutos((prev) => prev.filter((p) => p.id !== id));
        setMensagem({ tipo: "sucesso", texto: `Produto "${nome}" removido com sucesso!` });
      } else {
        setMensagem({ tipo: "erro", texto: "Não foi possível deletar o produto no servidor." });
      }
    } catch (err) {
      console.error(err);
      setMensagem({ tipo: "erro", texto: "Erro de conexão ao tentar deletar." });
    }
  }

  return (
    <div className="space-y-6 bg-[#0a0516] text-white min-h-screen p-1">
      
      {/* CABEÇALHO */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400">// GERENCIAMENTO</span>
        <h2 className="text-2xl font-bold mt-1 text-white">Produtos Cadastrados</h2>
        <p className="text-sm text-neutral-400 mt-1">Visualize, filtre as tags e gerencie os pacotes ativos da sua loja.</p>
      </div>

      {mensagem.texto && (
        <div className={`text-sm rounded-xl px-4 py-3 border ${mensagem.tipo === "erro" ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-green-500/10 border-green-500/20 text-green-400"}`}>
          {mensagem.texto}
        </div>
      )}

      {/* FORMULÁRIO DE EDIÇÃO */}
      {produtoEditando && (
        <div className="rounded-xl border border-purple-500/30 bg-[#130d24]/80 p-6 shadow-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-purple-950/40 pb-3">
            <h3 className="text-md font-bold text-purple-400">Editando Produto: <span className="text-white">{produtoEditando.name}</span></h3>
            <button type="button" onClick={() => setProdutoEditando(null)} className="text-xs text-neutral-400 hover:text-white transition cursor-pointer">Cancelar</button>
          </div>

          <form onSubmit={handleSalvarEdicao} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase text-neutral-400">Nome</label>
              <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="rounded-md border border-purple-950 bg-[#0c061a] px-3 py-2 text-sm text-white outline-none focus:border-purple-500" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase text-neutral-400">Categoria</label>
              <select value={editCategoryId} onChange={(e) => setEditCategoryId(e.target.value)} className="rounded-md border border-purple-950 bg-[#0c061a] px-3 py-2 text-sm text-white outline-none focus:border-purple-500 cursor-pointer">
                {categorias.map((cat) => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase text-neutral-400">Preço (R$)</label>
              <input type="number" step="0.01" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} className="rounded-md border border-purple-950 bg-[#0c061a] px-3 py-2 text-sm text-white outline-none focus:border-purple-500" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase text-neutral-400">Tag Promocional</label>
              <input type="text" value={editTag} onChange={(e) => setEditTag(e.target.value)} placeholder="Ex: +10% COINS, NOVO" className="rounded-md border border-purple-950 bg-[#0c061a] px-3 py-2 text-sm text-white outline-none focus:border-purple-500" />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-bold uppercase text-neutral-400">Descrição</label>
              <textarea rows={2} value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="rounded-md border border-purple-950 bg-[#0c061a] px-3 py-2 text-sm text-white outline-none focus:border-purple-500 resize-none" />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-bold uppercase text-neutral-400">Mudar Ícone Ilustrativo</label>
              <input type="file" ref={fileInputRef} onChange={(e) => e.target.files && processarImagemEdicao(e.target.files[0])} accept="image/*" className="hidden" />
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files) processarImagemEdicao(e.dataTransfer.files[0]); }}
                onClick={() => fileInputRef.current?.click()}
                className={`rounded-md border-2 border-dashed p-3 text-center cursor-pointer transition flex items-center justify-between h-[46px] ${isDragging ? "border-purple-400 bg-purple-950/20" : "border-purple-950 bg-[#0c061a]"}`}
              >
                <span className="text-xs text-neutral-500">Arraste ou clique para trocar o ícone</span>
                {editImage && <img src={editImage} alt="Preview" className="w-7 h-7 object-contain rounded bg-[#0a0516] border border-purple-950" />}
              </div>
            </div>

            <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setProdutoEditando(null)} className="px-4 py-2 text-xs font-bold uppercase text-neutral-400 hover:text-white cursor-pointer">Cancelar</button>
              <button type="submit" disabled={salvandoEdicao} className="rounded bg-purple-600 px-6 py-2 text-xs font-bold uppercase text-white hover:bg-purple-700 cursor-pointer disabled:opacity-50">
                {salvandoEdicao ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TABELA PRINCIPAL DE EXIBIÇÃO */}
      <div className="rounded-xl border border-purple-950/40 bg-[#130d24]/20 shadow-xl overflow-hidden">
        {carregando ? (
          <div className="p-12 text-center text-sm text-neutral-400 animate-pulse">Buscando itens na vitrine do Celestium...</div>
        ) : produtos.length === 0 ? (
          <div className="p-12 text-center text-sm text-neutral-500">Nenhum produto cadastrado no banco.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-purple-950/60 bg-[#0c061a] text-xs font-bold uppercase tracking-wider text-neutral-400">
                  <th className="py-4 px-6 w-16">Ícone</th>
                  <th className="py-4 px-6">Produto</th>
                  <th className="py-4 px-6">Categoria</th>
                  <th className="py-4 px-6">Tag Promocional</th>
                  <th className="py-4 px-6">Preço Base</th>
                  <th className="py-4 px-6 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-950/30 text-sm">
                {produtos.map((produto) => {
                  const categoriaNome = categorias.find(c => c.id === produto.categoryId)?.label || "Padrão";
                  
                  return (
                    <tr key={produto.id} className="transition-colors hover:bg-purple-950/10 group">
                      
                      <td className="py-4 px-6">
                        <div className="w-10 h-10 rounded-lg border border-purple-950/50 bg-[#0a0516] p-1 flex items-center justify-center">
                          {produto.image ? (
                            <img src={produto.image} alt={produto.name} className="max-h-full max-w-full object-contain" />
                          ) : (
                            <span className="text-[10px] text-neutral-600">N/A</span>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-bold text-white group-hover:text-purple-300 transition-colors">{produto.name}</div>
                        <div className="text-xs text-neutral-500 mt-0.5 truncate max-w-[260px]">{produto.description}</div>
                      </td>

                      <td className="py-4 px-6">
                        <span className="text-xs bg-purple-950/40 border border-purple-900/30 text-purple-300 px-2 py-1 rounded">
                          {categoriaNome}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        {produto.tag ? (
                          <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-md">
                            {produto.tag}
                          </span>
                        ) : (
                          <span className="text-xs text-neutral-600 italic">Nenhuma</span>
                        )}
                      </td>

                      <td className="py-4 px-6 font-semibold font-mono text-purple-400">
                        R$ {produto.price.toFixed(2)}
                      </td>

                      {/* ALINHAMENTO LADO A LADO DOS BOTÕES DE AÇÃO */}
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-4">
                          {/* BOTÃO EDITAR */}
                          <button
                            onClick={() => iniciarEdicao(produto)}
                            className="text-neutral-500 hover:text-purple-400 transition-colors p-1.5 rounded-md hover:bg-purple-500/10 cursor-pointer flex items-center gap-1 text-xs font-semibold"
                            title="Editar Produto"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                            Editar
                          </button>

                          {/* BOTÃO DELETAR ADICIONADO LADO A LADO */}
                          <button
                            onClick={() => handleDeletarProduto(produto.id, produto.name)}
                            className="text-neutral-500 hover:text-red-400 transition-colors p-1.5 rounded-md hover:bg-red-500/10 cursor-pointer flex items-center gap-1 text-xs font-semibold"
                            title="Excluir Produto"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.34 9m-4.72 0L9 9m1.74-4.75V4.5c0-.212-.03-.418-.084-.612m-2.43.047A24.896 24.896 0 0112.457 3h2.176c.396 0 .783.042 1.157.124M12 7h.01M19.5 7.125V18a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18V7.125M18 7h-12" />
                            </svg>
                            Excluir
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}