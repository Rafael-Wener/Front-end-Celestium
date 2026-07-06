'use client';

import { API_BASE_URL } from '@/utils/config';
import { useEffect, useState } from 'react';

export type Produto = {
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

export type Pedido = {
  id: string;
  cliente: string;
  total: number;
  status: 'Pendente' | 'Pago' | 'Entregue';
  createdAt: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
};

export type User = {
  id: string;
  nickname: string;
  email: string;
};

export function useAdminData() {
  const [user, setUser] = useState<User | null>(null);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [orders, setOrders] = useState<Pedido[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    async function loadUser() {
      if (!token || !userId) {
        setUser({ id: 'guest', nickname: localStorage.getItem('nickname') || 'Admin', email: '---' });
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser({
            id: data.id || userId,
            nickname: data.nickname || data.name || localStorage.getItem('nickname') || 'Admin',
            email: data.email || '---',
          });
        } else {
          setUser({ id: userId, nickname: localStorage.getItem('nickname') || 'Admin', email: '---' });
        }
      } catch {
        setUser({ id: userId, nickname: localStorage.getItem('nickname') || 'Admin', email: '---' });
      }
    }

    async function loadOrders() {
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setOrders(data);
          }
        }
      } catch {
        // fallback para pedidos simulados
      }
    }

    loadUser();
    loadOrders();
  }, []);

  return { user, produtos, setProdutos, orders, setOrders };
}
