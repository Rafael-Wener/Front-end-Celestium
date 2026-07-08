"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function TabelaDeVendas() {
  // Definição do tipo do Produto vindo do Banco
  type Produto = {
    id: string;
    name: string;
    categoryId: string;
    description: string;
    price: number;
    image: string;
    available: boolean;
    tag: string | null;
    rating: number;
  };

  // Estrutura padronizada para itens dentro do carrinho
  type ItemCarrinho = {
    produto: Produto;
    quantidade: number;
  };

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  
  // Controle do modal de Login Obrigatório ao finalizar
  const [mostrarModalLogin, setMostrarModalLogin] = useState(false);

  // BUSCA PÚBLICA: Removido o Header de Authorization para permitir ler o banco deslogado
  async function BuscarProdutos() {
    const res = await fetch("http://10.200.80.75:3005/products", {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Erro ao buscar produtos");
    }

    return await res.json();
  }

  // Verifica o login de forma isolada
  function verificarUsuarioLogado(): boolean {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    
    if (!token || !userId) {
      setMostrarModalLogin(true);
      return false;
    }
    return true;
  }

  // Ação de fechar o pedido (Aqui sim o login é obrigatório)
  async function finalizarCompra() {
    if (!verificarUsuarioLogado()) return;

    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const pedido = {
      userId,
      items: carrinho.map((item) => ({
        productId: item.produto.id,
        name: item.produto.name,
        price: item.produto.price,
        quantity: item.quantidade, // Mapeia corretamente para o formato esperado pelo back
      })),
    };

    try {
      const res = await fetch("http://10.200.80.75:3005/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(pedido),
      });

      console.log("Status:", res.status);

      const resposta = await res.json();
      console.log("Resposta do servidor:", resposta);

      alert("Compra realizada com sucesso!");

      setCarrinho([]);
      localStorage.removeItem("carrinho");
    } catch (err) {
      console.error(err);
      alert("Houve um erro ao processar o seu pedido.");
    }
  }

  // Cálculo dinâmico do valor total do carrinho baseado em item.quantidade
  const total = carrinho.reduce((soma, item) => {
    return soma + item.produto.price * item.quantidade;
  }, 0);

  // Filtro de categorias por ID do Banco
  const produtosFiltrados = categoriaSelecionada === "Todos"
    ? produtos
    : produtos.filter((produto) => produto.categoryId === categoriaSelecionada);

  // Somatório total de itens na cesta superior
  const quantidadeItens = carrinho.reduce((total, item) => {
    return total + item.quantidade;
  }, 0);

  // Carrega histórico local do carrinho e busca produtos do banco ao iniciar a tela
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");

    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo));
    }

    async function load() {
      try {
        const data = await BuscarProdutos();
        setProdutos(data);
      } catch (err) {
        console.error("Erro ao carregar catálogo do banco:", err);
      } finally {
        setCarregando(false);
      }
    }

    load();
  }, []);

  // Sincroniza o estado do carrinho com o LocalStorage
  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  // LIBERADO: Qualquer visitante adiciona itens livremente agora sem travar modal
  function adicionarAoCarrinho(produto: Produto) {
    setCarrinho((carrinhoAtual) => {
      const existente = carrinhoAtual.find(
        (item) => item.produto.id === produto.id
      );

      if (existente) {
        return carrinhoAtual.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      return [...carrinhoAtual, { produto, quantidade: 1 }];
    });
  }

  function diminuirQuantidade(produtoId: string) {
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual
        .map((item) =>
          item.produto.id === produtoId
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  function removerProduto(produtoId: string) {
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual.filter((item) => item.produto.id !== produtoId)
    );
  }

  if (carregando) {
    return (
      <div className="flex min-h-screen items-center justify-center text-purple-700 font-bold bg-[#0a0516]">
        Carregando...
      </div>
    );
  }

  return (
    <div className="w-full bg-[#0a0516] px-6 py-16 text-white md:px-12 xl:px-40 relative min-h-screen">
      
      {/* ================= MODAL DE LOGIN (DISPARADO SÓ NO BOTÃO FINALIZAR) ================= */}
      {mostrarModalLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl border border-purple-900/60 bg-[#130d24] p-6 text-center shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-purple-950/50 border border-purple-500/30 text-2xl text-purple-400 mb-4">
              🔒
            </div>
            <h3 className="text-xl font-black text-white">Login Obrigatório</h3>
            <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
              Você precisa estar logado na sua conta do **Celestium** para poder concluir o fechamento do seu pedido.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setMostrarModalLogin(false)}
                className="w-full rounded-xl bg-neutral-900 border border-neutral-800 py-3 text-sm font-bold text-neutral-400 hover:bg-neutral-800 transition cursor-pointer"
              >
                Voltar ao carrinho
              </button>
              <Link
                href="/login"
                className="w-full rounded-xl bg-purple-600 py-3 text-sm font-bold text-white hover:bg-purple-700 transition shadow-[0_4px_15px_rgba(147,51,234,0.3)] text-center flex items-center justify-center"
              >
                Fazer Login
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400">
            // Produtos disponíveis
          </div>
          <h2 className="mt-2 text-3xl font-black text-white">
            Escolha seus benefícios
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-neutral-400">
            Selecione ranks, moedas, kits e extras.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-md border border-purple-950/40 bg-[#130d24]/60 px-4 py-3 text-sm font-bold text-purple-300">
          <img src="/cesta-de-compras.png" alt="" className="h-5 w-5 invert opacity-70" />
          {quantidadeItens} item(ns) no carrinho
        </div>
      </div>

      {/* FILTROS */}
      <div className="mb-10 flex flex-wrap gap-3">
        {[
          { nome: "Todos", id: "Todos" },
          { nome: "Vips", id: "3108208f-74b4-426a-a5c2-ee678fc91a60" },
          { nome: "Celestiuns", id: "0e226e2b-4f7c-4640-b78a-eeadfd5d26b1" },
          { nome: "Chaves", id: "8bfc8bf7-d385-4cf4-8617-0913f1cb82c8" },
        ].map((categoria) => (
          <button
            key={categoria.id}
            onClick={() => setCategoriaSelecionada(categoria.id)}
            className={`rounded-md border px-4 py-2 text-sm font-bold transition cursor-pointer ${
              categoriaSelecionada === categoria.id
                ? "bg-purple-600 text-white border-purple-600"
                : "border-purple-950/40 bg-[#130d24]/40 text-neutral-300 hover:bg-purple-950/20"
            }`}
          >
            {categoria.nome}
          </button>
        ))}
      </div>

      {/* LISTAGEM DE PRODUTOS DINÂMICOS */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_360px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {produtosFiltrados.map((produto) => (
            <div
              key={produto.id}
              className="group overflow-hidden rounded-2xl border border-purple-950/40 bg-[#130d24]/40 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/60 hover:shadow-2xl flex flex-col justify-between"
            >
              <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-[#2a1148] via-[#5227a5] to-[#8b5cf6]">
                {produto.tag && (
                  <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-purple-700 shadow">
                    {produto.tag}
                  </span>
                )}

                {produto.image ? (
                  <img
                    src={produto.image}
                    alt={produto.name}
                    className="h-24 w-24 object-contain transition duration-300 group-hover:scale-110"
                  />
                ) : (
                  <img
                    src="/bau-de-tesouro.png"
                    alt=""
                    className="h-24 w-24 opacity-90"
                  />
                )}
              </div>

              <div className="flex flex-col p-6 flex-1 justify-between">
                <div>
                  <h3 className="text-2xl font-black text-white truncate">
                    {produto.name}
                  </h3>
                  <p className="mt-3 min-h-[60px] text-sm leading-6 text-neutral-400 line-clamp-3">
                    {produto.description}
                  </p>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-neutral-500">
                        Preço
                      </span>
                      <h2 className="text-3xl font-black text-purple-400">
                        R$ {produto.price.toFixed(2)}
                      </h2>
                    </div>

                    <div className="flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-sm font-bold text-amber-400">
                      ⭐ {produto.rating}
                    </div>
                  </div>

                  <button
                    onClick={() => adicionarAoCarrinho(produto)}
                    className="mt-6 w-full rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 py-3 font-bold text-white transition hover:scale-[1.02] hover:shadow-lg cursor-pointer text-center"
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* COMPONENTE DO CARRINHO LATERAL */}
        <div className="h-fit rounded-xl border border-purple-950/40 bg-[#140b2b] p-5 text-white shadow-lg xl:sticky xl:top-6">
          <div className="border-b border-purple-900/60 pb-4">
            <h3 className="text-xl font-bold">Seu carrinho</h3>
            <p className="mt-1 text-xs text-neutral-400">Resumo da compra</p>
          </div>

          {carrinho.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <img
                src="/cesta-de-compras.png"
                className="mb-4 h-10 w-10 invert opacity-40"
                alt=""
              />
              <p className="font-bold text-neutral-300">Carrinho vazio</p>
              <span className="mt-2 text-sm text-neutral-500">
                Adicione produtos para ver aqui
              </span>
            </div>
          ) : (
            <div className="mt-5 flex flex-col gap-4">
              {carrinho.map((item) => (
                <div
                  key={item.produto.id}
                  className="rounded-xl border border-purple-900/60 bg-[#1d1238] p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-white">
                        {item.produto.name}
                      </h4>
                      <p className="mt-1 text-sm text-neutral-400">
                        R$ {item.produto.price.toFixed(2)} cada
                      </p>
                    </div>

                    <button
                      onClick={() => removerProduto(item.produto.id)}
                      className="text-xs font-bold text-red-400 transition hover:text-red-300 cursor-pointer"
                    >
                      Remover
                    </button>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex items-center overflow-hidden rounded-lg border border-purple-800">
                      <button
                        onClick={() => diminuirQuantidade(item.produto.id)}
                        className="h-9 w-9 bg-purple-950 text-lg font-bold transition hover:bg-purple-900 cursor-pointer"
                      >
                        −
                      </button>
                      <span className="flex h-9 w-10 items-center justify-center bg-[#140b2b] font-bold">
                        {item.quantidade}
                      </span>
                      <button
                        onClick={() => adicionarAoCarrinho(item.produto)}
                        className="h-9 w-9 bg-purple-950 text-lg font-bold transition hover:bg-purple-900 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <strong className="text-lg text-purple-300">
                      R$ {(item.produto.price * item.quantidade).toFixed(2)}
                    </strong>
                  </div>
                </div>
              ))}

              <div className="border-t border-purple-900/60 pt-5">
                <div className="flex justify-between text-sm text-neutral-400">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>

                <div className="mt-2 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-purple-400">R$ {total.toFixed(2)}</span>
                </div>

                <button
                  className="mt-5 w-full rounded-md bg-purple-600 py-3 font-bold text-white hover:bg-purple-500 transition cursor-pointer text-center"
                  onClick={finalizarCompra}
                >
                  Finalizar compra
                </button>

                <Link
                  href="/login"
                  className="mt-3 block text-center text-sm text-purple-300 underline opacity-80 hover:opacity-100"
                >
                  Entrar antes de comprar
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}