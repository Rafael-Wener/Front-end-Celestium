'use client';

import { FormEvent, useState } from 'react';
import { Produto } from '../hooks/useAdminData';

interface AdminProdutosProps {
  produtos: Produto[];
  onAddProduto: (produto: Omit<Produto, 'id'>) => void;
  onUpdateProduto: (id: string, produto: Omit<Produto, 'id'>) => void;
  onDeleteProduto: (id: string) => void;
}

const emptyForm: Omit<Produto, 'id'> = {
  name: '',
  categoryId: '3108208f-74b4-426a-a5c2-ee678fc91a60',
  description: '',
  price: 0,
  image: '/bau-de-tesouro.png',
  available: true,
  tag: null,
  rating: 5,
};

export default function AdminProdutos({
  produtos,
  onAddProduto,
  onUpdateProduto,
  onDeleteProduto,
}: AdminProdutosProps) {
  const [form, setForm] = useState<Omit<Produto, 'id'>>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setMessage(null);
  }

  function handleEdit(produto: Produto) {
    setForm({
      name: produto.name,
      categoryId: produto.categoryId,
      description: produto.description,
      price: produto.price,
      image: produto.image,
      available: produto.available,
      tag: produto.tag,
      rating: produto.rating,
    });
    setEditingId(produto.id);
    setMessage('Editando produto existente. Faça suas alterações e salve.');
  }

  function handleDelete(id: string) {
    onDeleteProduto(id);
    setMessage('Produto removido com sucesso.');
    if (editingId === id) {
      resetForm();
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim()) {
      setMessage('O nome do produto é obrigatório.');
      return;
    }

    if (editingId) {
      onUpdateProduto(editingId, form);
      setMessage('Produto atualizado com sucesso.');
    } else {
      onAddProduto(form);
      setMessage('Produto adicionado com sucesso.');
    }

    resetForm();
  }

  return (
    <section className="space-y-8 rounded border border-white/10 bg-[#09060f]/90 p-6 shadow-2xl shadow-black/50">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white">Produtos</h3>
          <p className="mt-2 text-sm text-slate-400">Gerencie o catálogo de produtos e atualize o estoque.</p>
        </div>
        <button
          type="button"
          onClick={resetForm}
          className="rounded bg-purple-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple-500 cursor-pointer"
        >
          Novo produto
        </button>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded border border-white/10 bg-black/60">
          <div className="grid grid-cols-7 gap-4 bg-white/5 px-5 py-4 text-xs uppercase tracking-[0.35em] text-slate-400 sm:grid-cols-[2fr_1fr_1fr_1fr]">
            <span className="col-span-2">Nome</span>
            <span>Categoria</span>
            <span>Preço</span>
            <span>Status</span>
            <span className="hidden sm:inline-flex">Ações</span>
          </div>
          <div className="divide-y divide-white/10 bg-[#05030a]">
            {produtos.map((produto) => (
              <div key={produto.id} className="grid grid-cols-7 gap-4 px-5 py-4 text-sm text-slate-200 sm:grid-cols-[2fr_1fr_1fr_1fr]">
                <div className="col-span-2">
                  <p className="font-semibold text-white">{produto.name}</p>
                  <p className="mt-1 text-xs text-slate-500">{produto.tag ?? 'Sem tag'}</p>
                </div>
                <div>
                  {produto.categoryId === '3108208f-74b4-426a-a5c2-ee678fc91a60'
                    ? 'Vips'
                    : produto.categoryId === '0e226e2b-4f7c-4640-b78a-eeadfd5d26b1'
                    ? 'Celestiuns'
                    : 'Chaves'}
                </div>
                <div>R$ {produto.price.toFixed(2)}</div>
                <div className={produto.available ? 'text-emerald-400' : 'text-rose-400'}>
                  {produto.available ? 'Ativo' : 'Inativo'}
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => handleEdit(produto)}
                    className="rounded border border-purple-600 px-3 py-1 text-xs font-bold text-purple-300 transition hover:bg-purple-600/10 cursor-pointer"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(produto.id)}
                    className="rounded border border-slate-600 px-3 py-1 text-xs font-bold text-slate-300 transition hover:bg-white/5 cursor-pointer"
                  >
                    Apagar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded border border-white/10 bg-black/60 p-6">
          <h4 className="text-xl font-bold text-white">Adicionar / editar produto</h4>
          <p className="mt-2 text-sm text-slate-400">Preencha os dados abaixo e salve para atualizar o catálogo.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {message && <div className="rounded bg-white/5 px-4 py-3 text-sm text-slate-200">{message}</div>}

            <div className="grid gap-4">
              <label className="space-y-2 text-sm text-slate-200">
                Nome do produto
                <input
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  className="w-full rounded border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-200">
                Categoria
                <select
                  value={form.categoryId}
                  onChange={(event) => setForm((prev) => ({ ...prev, categoryId: event.target.value }))}
                  className="w-full rounded border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 cursor-pointer"
                >
                  <option value="3108208f-74b4-426a-a5c2-ee678fc91a60">Vips</option>
                  <option value="0e226e2b-4f7c-4640-b78a-eeadfd5d26b1">Celestiuns</option>
                  <option value="8bfc8bf7-d385-4cf4-8617-0913f1cb82c8">Chaves</option>
                </select>
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-200">
                  Preço (R$)
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.price}
                    onChange={(event) => setForm((prev) => ({ ...prev, price: Number(event.target.value) }))}
                    className="w-full rounded border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-200">
                  Nota do produto
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={form.rating}
                    onChange={(event) => setForm((prev) => ({ ...prev, rating: Number(event.target.value) }))}
                    className="w-full rounded border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  />
                </label>
              </div>

              <label className="space-y-2 text-sm text-slate-200">
                Descrição
                <textarea
                  value={form.description}
                  onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                  rows={4}
                  className="w-full rounded border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-200">
                Imagem
                <input
                  value={form.image}
                  onChange={(event) => setForm((prev) => ({ ...prev, image: event.target.value }))}
                  className="w-full rounded border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-200">
                Tag de destaque
                <input
                  value={form.tag ?? ''}
                  onChange={(event) => setForm((prev) => ({ ...prev, tag: event.target.value }))}
                  className="w-full rounded border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </label>

              <label className="flex items-center gap-3 text-sm font-medium text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.available}
                  onChange={(event) => setForm((prev) => ({ ...prev, available: event.target.checked }))}
                  className="h-5 w-5 rounded border-slate-700 bg-slate-900 text-purple-500 focus:ring-purple-500 cursor-pointer"
                />
                Produto disponível para compra
              </label>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={resetForm}
                className="rounded border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/5 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-500 cursor-pointer"
              >
                {editingId ? 'Salvar alterações' : 'Adicionar produto'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
