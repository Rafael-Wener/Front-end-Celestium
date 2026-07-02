"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function TabelaDeVendas() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarProdutos();
  }, []);

  async function buscarProdutos() {
    try {
      const res = await fetch("http://10.200.80.75:3005/products");

      if (!res.ok) {
        throw new Error("Erro ao buscar produtos");
      }

      const data = await res.json();

      setProdutos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setCarregando(false);
    }
  }

  if (carregando) {
    return <h1>Carregando produtos...</h1>;
  }

return (
  <div className="w-full bg-white px-6 py-16 text-[#140b2b] md:px-12 xl:px-40">
    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-purple-500">
          {"// Produtos disponiveis"}
        </div>

        <h2 className="mt-2 text-3xl font-bold text-[#140b2b]">
          Escolha seus beneficios
        </h2>

        <p className="mt-2 max-w-2xl text-sm text-gray-500">
          Selecione ranks, moedas, kits e extras. Quando o backend estiver
          ligado, os produtos vem direto do banco.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-md border border-purple-100 bg-purple-50 px-4 py-3 text-sm font-bold text-purple-900">
        <img src="/cesta-de-compras.png" alt="" className="h-5 w-5" />
        item no carrinho
      </div>
    </div>

    <div className="mb-8 rounded-md border border-purple-100 bg-purple-50 px-4 py-3 text-sm font-semibold text-purple-950"></div>

    <div className="mb-10 flex flex-wrap gap-3"></div>

    <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_360px]">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">

        <div className="rounded-xl border border-purple-100 bg-[#140b2b] p-8 text-white shadow-[0_8px_24px_rgba(20,11,43,0.18)] md:col-span-2 2xl:col-span-3">
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl border border-purple-800 bg-purple-950/60">
              <img
                src="/bau-de-tesouro.png"
                alt=""
                className="h-8 w-8 invert opacity-70"
              />
            </div>

            <h3 className="text-xl font-bold">
              Nenhum produto no banco
            </h3>

            <p className="mt-2 max-w-md text-sm text-gray-400">
              Assim que os produtos forem cadastrados no backend, eles vao
              aparecer aqui automaticamente.
            </p>
          </div>
        </div>

        <div
          key={}
          className="flex min-h-[390px] flex-col rounded-xl border border-purple-100 bg-[#140b2b] p-5 text-white shadow-[0_8px_24px_rgba(20,11,43,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-purple-400"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-purple-800 bg-purple-950/60">
              <img
                src={}
                alt={}
                className="h-8 w-8 invert"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-1 flex-col">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-purple-300">
              <span>{}</span>
              <span className="text-purple-700">/</span>
              <span>{}</span>
            </div>

            <h3 className="mt-2 text-2xl font-bold">{}</h3>

            <p className="mt-3 text-sm leading-6 text-gray-300">
              {}
            </p>

            <div className="mt-5 flex flex-col gap-2"></div>

            <div className="mt-auto pt-6">
              <div className="mb-4 flex items-end justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-gray-400">
                  Preco
                </span>

                <strong className="text-2xl text-purple-300">
                  {}
                </strong>
              </div>

              <button
                onClick={}
                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-md bg-purple-700 px-4 py-3 font-bold text-white transition-all duration-300 hover:bg-purple-600"
              >
                <img
                  src="/cesta-de-compras.png"
                  alt=""
                  className="h-5 w-5 invert"
                />
                Adicionar
              </button>
            </div>
          </div>
        </div>

      </div>

      <div className="h-fit rounded-xl border border-purple-100 bg-[#140b2b] p-5 text-white shadow-[0_8px_24px_rgba(20,11,43,0.18)] xl:sticky xl:top-6">
        <div className="flex items-center justify-between border-b border-purple-900/70 pb-4">
          <div>
            <h3 className="text-xl font-bold">Seu carrinho</h3>

            <p className="mt-1 text-xs text-gray-400">
              Login, produtos e pedidos usam o backend na porta 3005.
            </p>
          </div>

          <img src="/cartao.png" alt="" className="h-8 w-10" />
        </div>

        <div className="mt-6 border-t border-purple-900/70 pt-5">
          <div className="flex items-center justify-between text-sm text-gray-300">
            <span>Subtotal</span>
          </div>

          <div className="mt-2 flex items-center justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-purple-300"></span>
          </div>

          <button
            onClick={}
            disabled={}
            className="mt-5 flex w-full cursor-pointer items-center justify-center rounded-md bg-purple-700 px-4 py-3 font-bold text-white transition-all duration-300 hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
          </button>

          <Link
            href="/login"
            className="mt-3 flex w-full items-center justify-center rounded-md border border-purple-800 px-4 py-3 text-sm font-bold text-purple-200 transition-all duration-300 hover:bg-purple-950"
          >
            Entrar antes de comprar
          </Link>

          <p className="mt-4 text-xs leading-5 text-gray-400">
            Checkout separado em <strong>lojaService.ts</strong>. Ele envia o
            pedido para <strong>/orders</strong> usando o usuario logado.
          </p>
        </div>
      </div>
    </div>
  </div>
)};