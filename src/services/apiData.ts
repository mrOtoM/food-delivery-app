import { MenuItemTypes } from '@/types/MenuTypes';

import { Order } from '@/types/OrderTypes';

const API_URL = '';

export async function getMenu(): Promise<MenuItemTypes[]> {
  const res = await fetch(`${API_URL}/menu`);

  if (!res.ok) throw Error('Failed getting menu');

  const { data } = await res.json();
  return data;
}

export async function getOrder(id: string) {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Nenasla sa objednavka #${id}`);

  const { data } = await res.json();
  return data;
}

export async function createOrder(newOrder: Order) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error('Failed creating your order');
  }
}

