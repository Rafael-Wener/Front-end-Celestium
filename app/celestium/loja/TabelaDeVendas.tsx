"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function TabelaDeVendas() {
  async function BuscarProdutos() {
    const token = localStorage.getItem("token");

    // ESPERA O BANCO RESPONDER COM O TOKEN
    const res = await fetch("http://10.200.80.75:3005/products", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Erro ao buscar produtos");
    }

    return await res.json();
  }

  // TS BURRO NAO SABE LER JSON E PRECISA SER DEFINIDO
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

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");

  // BUSCA OS PRODUTOS NO BANCO DE DADOS E RETORNA
  useEffect(() => {
    async function load() {
      try {
        const data = await BuscarProdutos();
        console.log(data);
        console.log(data.length);

        setProdutos(data);
      } catch (err) {
        console.log(err);
      } finally {
        setCarregando(false);
      }
    }
    load();
  }, []);

  // TELA DE LOADING BEM MERDA
  if (carregando) {
    return (
      <div className="flex min-h-screen items-center justify-center text-purple-700 text-bold">
        Carregando...
      </div>
    );
  }

  //FILTRO DOS PRODUTOS
  const produtosFiltrados =
    categoriaSelecionada === "Todos"
      ? produtos
      : produtos.filter(
        (produto) => produto.categoryId === categoriaSelecionada
      );

  // CSS E TELA EM SI
  return (
    <div className="w-full bg-white px-6 py-16 text-[#140b2b] md:px-12 xl:px-40">

      {/* HEADER */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-purple-500">
            // Produtos disponíveis
          </div>

          <h2 className="mt-2 text-3xl font-bold">
            Escolha seus benefícios
          </h2>

          <p className="mt-2 max-w-2xl text-sm text-gray-500">
            Selecione ranks, moedas, kits e extras.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-md border border-purple-100 bg-purple-50 px-4 py-3 text-sm font-bold text-purple-900">
          <img src="/cesta-de-compras.png" alt="" className="h-5 w-5" />
          0 item(ns) no carrinho
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
            className={`rounded-md border px-4 py-2 text-sm font-bold transition ${categoriaSelecionada === categoria.id
                ? "bg-purple-700 text-white border-purple-700"
                : "border-purple-200 bg-white text-purple-900 hover:bg-purple-50"
              }`}
          >
            {categoria.nome}
          </button>
        ))}
      </div>

      {/* CONTEÚDO */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_360px]">

        {/* PRODUTOS */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {produtosFiltrados.map((produto) => (
            <div
              key={produto.id}
              className="group overflow-hidden rounded-2xl border border-purple-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-purple-500 hover:shadow-2xl"
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

              <div className="flex flex-col p-6">
                <h3 className="text-2xl font-extrabold text-[#140b2b]">
                  {produto.name}
                </h3>

                <p className="mt-3 min-h-[60px] text-sm leading-6 text-gray-500">
                  {produto.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-gray-400">
                      Preço
                    </span>

                    <h2 className="text-3xl font-extrabold text-purple-700">
                      R$ {produto.price.toFixed(2)}
                    </h2>
                  </div>

                  <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm font-bold text-yellow-700">
                    ⭐ {produto.rating}
                  </div>
                </div>

                <button className="mt-6 rounded-xl bg-gradient-to-r from-purple-700 to-fuchsia-600 py-3 font-bold text-white transition hover:scale-[1.02] hover:shadow-lg cursor-pointer">
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CARRINHO */}
        <div className="h-fit rounded-xl border border-purple-100 bg-[#140b2b] p-5 text-white shadow-lg xl:sticky xl:top-6">

          <div className="border-b border-purple-900 pb-4">
            <h3 className="text-xl font-bold">Seu carrinho</h3>
            <p className="mt-1 text-xs text-gray-400">
              Resumo da compra
            </p>
          </div>

          {/* EMPTY STATE */}
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <img
              src="/cesta-de-compras.png"
              className="mb-4 h-10 w-10 invert opacity-60"
            />
            <p className="font-bold">Carrinho vazio</p>
            <span className="mt-2 text-sm text-gray-400">
              Adicione produtos para ver aqui
            </span>
          </div>

          <div className="border-t border-purple-900 pt-5">
            <div className="flex justify-between text-sm text-gray-300">
              <span>Subtotal</span>
              <span>R$ 0,00</span>
            </div>

            <div className="mt-2 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-purple-300">R$ 0,00</span>
            </div>

            <button className="mt-5 w-full rounded-md bg-purple-700 py-3 font-bold text-white hover:bg-purple-600 cursor-pointer">
              Finalizar compra
            </button>

            <Link
              href="/login"
              className="mt-3 block text-center text-sm text-purple-300 underline"
            >
              Entrar antes de comprar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}