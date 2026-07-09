"use client";

import { useEffect, useState } from "react";

interface Categoria {
  id: string;
  label: string;
}

export default function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });
  const [nomeCategoria, setNomeCategoria] = useState("");
  const [idSendoEditado, setIdSendoEditado] = useState<string | null>(null);

  // 1. CARREGAR CATEGORIAS
  async function carregarCategorias() {
    const token = localStorage.getItem("token");
    try {
      setCarregando(true);
      const res = await fetch("http://localhost:3005/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setCategorias(data);
    } catch {
      setMensagem({ tipo: "erro", texto: "Não foi possível carregar as categorias." });
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  // 2. SALVAR (CRIAR OU ATUALIZAR)
  async function handleSalvar(e: React.FormEvent) {
    e.preventDefault();
    setMensagem({ tipo: "", texto: "" });

    if (!nomeCategoria.trim()) {
      setMensagem({ tipo: "erro", texto: "O nome da categoria não pode estar vazio!" });
      return;
    }

    const token = localStorage.getItem("token");
    setSalvando(true);

    const url = idSendoEditado 
      ? `http://localhost:3005/categories/${idSendoEditado}` 
      : "http://localhost:3005/categories";
      
    const method = idSendoEditado ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          label: nomeCategoria,
          icon: "" // Passando string vazia por padrão para não quebrar o service antigo
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensagem({ 
          tipo: "sucesso", 
          texto: idSendoEditado ? "Categoria atualizada com sucesso!" : "Categoria criada com sucesso!" 
        });
        setNomeCategoria("");
        setIdSendoEditado(null);
        carregarCategorias();
      } else {
        setMensagem({ tipo: "erro", texto: data.message || "Erro ao processar requisição." });
      }
    } catch {
      setMensagem({ tipo: "erro", texto: "Erro de conexão com o servidor." });
    } finally {
      setSalvando(false);
    }
  }

  function prepararEdicao(categoria: Categoria) {
    setIdSendoEditado(categoria.id);
    // O segredo está aqui: o "||" garante que nunca injetaremos undefined ou null no input
    setNomeCategoria(categoria.label || ""); 
    setMensagem({ tipo: "", texto: "" });
  }

  function cancelarEdicao() {
    setIdSendoEditado(null);
    setNomeCategoria("");
    setMensagem({ tipo: "", texto: "" });
  }

  // 3. DELETAR CATEGORIA
  async function handleDeletar(id: string) {
    if (!confirm("Tem certeza que deseja excluir esta categoria? Isso pode afetar os produtos vinculados.")) return;

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:3005/categories/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setCategorias((prev) => prev.filter((cat) => cat.id !== id));
        setMensagem({ tipo: "sucesso", texto: "Categoria removida com sucesso!" });
        if (idSendoEditado === id) cancelarEdicao();
      } else {
        alert("Erro ao deletar. Verifique se existem produtos usando esta categoria.");
      }
    } catch {
      alert("Erro de conexão ao deletar.");
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[400px_1fr] bg-[#0a0516] p-1 text-white min-h-screen">
      
      {/* FORMULÁRIO */}
      <div className="rounded-xl border border-purple-950/40 bg-[#130d24]/40 p-6 shadow-xl h-fit">
        <div className="mb-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400">// LOJA CELESTIUM</span>
          <h2 className="text-2xl font-bold mt-1 text-white">{idSendoEditado ? "Editar Categoria" : "Nova Categoria"}</h2>
          <p className="text-sm text-neutral-400 mt-1">
            {idSendoEditado ? "Altere o nome da categoria selecionada." : "Crie divisões para organizar seus produtos."}
          </p>
        </div>

        <form onSubmit={handleSalvar} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wide text-neutral-400">Nome da Categoria</label>
            <input
              type="text"
              // O fallback garante que o valor inicial seja ao menos string vazia ""
              value={nomeCategoria || ""} 
              onChange={(e) => setNomeCategoria(e.target.value)}
              placeholder="Ex: VIPs, Moedas, Chaves..."
              className="w-full rounded-md border border-purple-950/60 bg-[#0c061a] px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-purple-500"
            />
          </div>

          {mensagem.texto && (
            <p className={`text-sm rounded-xl px-4 py-3 border ${
              mensagem.tipo === "sucesso" ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}>
              {mensagem.texto}
            </p>
          )}

          <div className="flex gap-2">
            {idSendoEditado && (
              <button
                type="button"
                onClick={cancelarEdicao}
                className="w-1/3 rounded-md bg-neutral-800 py-3 text-sm font-bold text-neutral-300 transition hover:bg-neutral-700 cursor-pointer"
              >
                Cancelar
              </button>
            )}
            <button
              type="submit"
              disabled={salvando}
              className={`rounded-md bg-purple-600 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-purple-700 shadow-[0_4px_15px_rgba(147,51,234,0.2)] disabled:opacity-50 cursor-pointer ${idSendoEditado ? "w-2/3" : "w-full"}`}
            >
              {salvando ? "Salvando..." : idSendoEditado ? "Atualizar" : "Criar Categoria"}
            </button>
          </div>
        </form>
      </div>

      {/* TABELA */}
      <div className="rounded-xl border border-purple-950/40 bg-[#130d24]/20 shadow-xl overflow-hidden h-fit">
        <div className="p-6 bg-[#0c061a]/60 border-b border-purple-950/60">
          <h3 className="text-lg font-bold text-white">Categorias Existentes</h3>
          <p className="text-xs text-neutral-400">UUIDs e identificadores salvos no banco de dados.</p>
        </div>

        {carregando ? (
          <div className="p-12 text-center text-sm text-neutral-400 animate-pulse">Buscando categorias no Celestium...</div>
        ) : categorias.length === 0 ? (
          <div className="p-12 text-center text-sm text-neutral-500">Nenhuma categoria cadastrada ainda.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-purple-950/60 bg-[#0c061a]/40 text-xs font-bold uppercase tracking-wider text-neutral-400">
                  <th className="py-4 px-6">Nome</th>
                  <th className="py-4 px-6 hidden sm:table-cell">ID de Referência (UUID)</th>
                  <th className="py-4 px-6 w-40 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-950/30 text-sm">
                {categorias.map((cat) => (
                  <tr key={cat.id} className={`transition-colors group ${idSendoEditado === cat.id ? "bg-purple-500/10" : "hover:bg-purple-950/10"}`}>
                    <td className="py-4 px-6 font-bold text-white group-hover:text-purple-300 transition-colors">{cat.label}</td>
                    <td className="py-4 px-6 text-xs text-neutral-500 font-mono hidden sm:table-cell selection:bg-purple-500/30">{cat.id}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => prepararEdicao(cat)}
                          className="rounded-md border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs font-bold text-purple-400 transition hover:bg-purple-500 hover:text-white cursor-pointer"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletar(cat.id)}
                          className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-400 transition hover:bg-red-500 hover:text-white cursor-pointer"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}