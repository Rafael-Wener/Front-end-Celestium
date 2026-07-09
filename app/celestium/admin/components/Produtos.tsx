"use client";

import { useEffect, useState } from "react";

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
  available: boolean;
  tag?: string | null;
}

export default function ListarProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  // ADICIONADO: Estado para armazenar as categorias vindas do banco de dados
  const [categorias, setCategorias] = useState<Categoria[]>([]); 
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [modalAberto, setModalAberto] = useState(false);
  const [produtoSendoEditado, setProdutoSendoEditado] = useState<Produto | null>(null);
  const [salvandoEdicao, setSalvandoEdicao] = useState(false);

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

  // ADICIONADO: Função para carregar as categorias reais da API
  async function carregarCategorias() {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3005/categories", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setCategorias(data);
      }
    } catch (err) {
      console.error("Erro ao carregar categorias no produto:", err);
    }
  }

  async function carregarProdutos() {
    try {
      setCarregando(true);
      const res = await fetch("http://localhost:3005/products");
      if (!res.ok) throw new Error("Falha ao buscar os produtos.");
      const data = await res.json();
      setProdutos(data);
    } catch (err) {
      setErro("Não foi possível carregar a lista de produtos.");
      console.error(err);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarProdutos();
    carregarCategorias(); // Carrega as categorias assim que a tela abre
  }, []);

  async function handleDeletar(id: string) {
    if (!confirm("Tem certeza que deseja excluir permanentemente este produto?")) return;

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:3005/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setProdutos((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Erro ao deletar o produto.");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
    }
  }

  function abrirEdicao(produto: Produto) {
    setProdutoSendoEditado({ ...produto });
    setModalAberto(true);
  }

  async function handleSalvarEdicao() {
    if (!produtoSendoEditado) return;

    const token = localStorage.getItem("token");
    setSalvandoEdicao(true);

    try {
      const res = await fetch(`http://localhost:3005/products/${produtoSendoEditado.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: produtoSendoEditado.name,
          description: produtoSendoEditado.description,
          price: parseFloat(String(produtoSendoEditado.price)) || 0,
          image: produtoSendoEditado.image,
          categoryId: produtoSendoEditado.categoryId,
          tag: produtoSendoEditado.tag || null,
        }),
      });

      if (res.ok) {
        setProdutos((prev) =>
          prev.map((p) => (p.id === produtoSendoEditado.id ? produtoSendoEditado : p))
        );
        setModalAberto(false);
        setProdutoSendoEditado(null);
      } else {
        alert("Erro ao atualizar o produto.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão ao salvar.");
    } finally {
      setSalvandoEdicao(false);
    }
  }

  // MODIFICADO: Função agora busca dinamicamente o nome da categoria com base no array vindo da API
  function obterNomeCategoria(categoryId: string) {
    const categoriaEncontrada = categorias.find(c => c.id === categoryId);
    
    if (categoriaEncontrada) {
      // Estilizações baseadas no nome comum para manter o design bonito
      const nomeLower = categoriaEncontrada.label.toLowerCase();
      if (nomeLower.includes("vip")) {
        return { nome: categoriaEncontrada.label, classe: "bg-purple-500/10 text-purple-400 border-purple-500/20" };
      }
      if (nomeLower.includes("celestium")) {
        return { nome: categoriaEncontrada.label, classe: "bg-amber-500/10 text-amber-400 border-amber-500/20" };
      }
      if (nomeLower.includes("chave")) {
        return { nome: categoriaEncontrada.label, classe: "bg-blue-500/10 text-blue-400 border-blue-500/20" };
      }
      return { nome: categoriaEncontrada.label, classe: "bg-neutral-500/10 text-neutral-400 border-neutral-500/20" };
    }

    return { nome: "Carregando...", classe: "bg-neutral-500/10 text-neutral-400 border-neutral-500/20" };
  }

  return (
    <div className="space-y-8 bg-[#0a0516] text-white min-h-screen p-1 relative">
      
      {/* CABEÇALHO */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400">// PAINEL DE CONTROLE</span>
        <h2 className="text-2xl font-bold mt-1 text-white">Produtos Cadastrados</h2>
        <p className="text-sm text-neutral-400 mt-1">Visualize, edite ou remova os pacotes disponíveis na sua loja em tempo real.</p>
      </div>

      {/* TABELA DE PRODUTOS */}
      <div className="rounded-xl border border-purple-950/40 bg-[#130d24]/20 shadow-xl overflow-hidden">
        {carregando ? (
          <div className="p-12 text-center text-sm text-neutral-400 animate-pulse">Carregando produtos do Celestium...</div>
        ) : erro ? (
          <div className="p-12 text-center text-sm text-red-400 border border-red-500/10 bg-red-500/5">{erro}</div>
        ) : produtos.length === 0 ? (
          <div className="p-12 text-center text-sm text-neutral-500">Nenhum produto cadastrado no banco de dados ainda.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-purple-950/60 bg-[#0c061a] text-xs font-bold uppercase tracking-wider text-neutral-400">
                  <th className="py-4 px-6 w-20">Ícone</th>
                  <th className="py-4 px-6">Nome do Produto</th>
                  <th className="py-4 px-6">Categoria</th>
                  <th className="py-4 px-6">Preço</th>
                  <th className="py-4 px-6 w-40 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-950/30 text-sm">
                {produtos.map((produto) => {
                  const catInfo = obterNomeCategoria(produto.categoryId);
                  return (
                    <tr key={produto.id} className="transition-colors hover:bg-purple-950/10 group">
                      <td className="py-4 px-6">
                        <div className="w-10 h-10 rounded-lg bg-[#0c061a] border border-purple-950/60 p-1 flex items-center justify-center">
                          <img 
                            src={produto.image && produto.image.trim() !== "" ? produto.image : "/produtos/VipImperador.png"} 
                            alt={produto.name} 
                            className="w-full h-full object-contain" 
                          />
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-bold text-white group-hover:text-purple-300 transition-colors">{produto.name}</div>
                        <div className="text-xs text-neutral-500 max-w-xs truncate mt-0.5">{produto.description}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-md border ${catInfo.classe}`}>
                          {catInfo.nome}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-purple-400">R$ {produto.price.toFixed(2)}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => abrirEdicao(produto)}
                            className="rounded-md border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs font-bold text-purple-400 transition hover:bg-purple-500 hover:text-white cursor-pointer"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeletar(produto.id)}
                            className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-400 transition hover:bg-red-500 hover:text-white cursor-pointer"
                          >
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

      {/* MODAL DE EDIÇÃO */}
      {modalAberto && produtoSendoEditado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl rounded-xl border border-purple-500/30 bg-[#110a22] p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-purple-950/60 pb-4">
              <h3 className="text-xl font-bold text-white">Editar Informações</h3>
              <button type="button" onClick={() => setModalAberto(false)} className="text-neutral-400 hover:text-white text-lg font-bold cursor-pointer">✕</button>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase text-neutral-400">Nome do Produto</label>
                <input
                  type="text"
                  value={produtoSendoEditado.name}
                  onChange={(e) => setProdutoSendoEditado({ ...produtoSendoEditado, name: e.target.value })}
                  className="w-full rounded-md border border-purple-950/60 bg-[#0c061a] px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* MODIFICADO: O select de Categorias agora renderiza dinamicamente as categorias da API */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase text-neutral-400">Categoria</label>
                  <select
                    value={produtoSendoEditado.categoryId}
                    onChange={(e) => setProdutoSendoEditado({ ...produtoSendoEditado, categoryId: e.target.value })}
                    className="w-full rounded-md border border-purple-950/60 bg-[#0c061a] px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500 cursor-pointer"
                  >
                    <option value="">Selecione uma categoria</option>
                    {categorias.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase text-neutral-400">Ícone</label>
                  <select
                    value={produtoSendoEditado.image}
                    onChange={(e) => setProdutoSendoEditado({ ...produtoSendoEditado, image: e.target.value })}
                    className="w-full rounded-md border border-purple-950/60 bg-[#0c061a] px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500 cursor-pointer"
                  >
                    {opcoesImagens.map((opt) => (
                      <option key={opt.url} value={opt.url}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase text-neutral-400">Preço (R$)</label>
                  <input
                    type="text"
                    value={produtoSendoEditado.price}
                    onChange={(e) => setProdutoSendoEditado({ ...produtoSendoEditado, price: parseFloat(e.target.value) || 0 })}
                    className="w-full rounded-md border border-purple-950/60 bg-[#0c061a] px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase text-neutral-400">Tag Promocional</label>
                  <input
                    type="text"
                    value={produtoSendoEditado.tag || ""}
                    onChange={(e) => setProdutoSendoEditado({ ...produtoSendoEditado, tag: e.target.value })}
                    placeholder="Nenhuma tag"
                    className="w-full rounded-md border border-purple-950/60 bg-[#0c061a] px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase text-neutral-400">Descrição</label>
                <textarea
                  rows={3}
                  value={produtoSendoEditado.description}
                  onChange={(e) => setProdutoSendoEditado({ ...produtoSendoEditado, description: e.target.value })}
                  className="w-full rounded-md border border-purple-950/60 bg-[#0c061a] px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500 resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-purple-950/60">
              <button type="button" onClick={() => setModalAberto(false)} className="rounded-md bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-300 transition hover:bg-neutral-700 cursor-pointer">Cancelar</button>
              <button type="button" disabled={salvandoEdicao} onClick={handleSalvarEdicao} className="rounded-md bg-purple-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-purple-700 disabled:opacity-50 cursor-pointer">
                {salvandoEdicao ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}