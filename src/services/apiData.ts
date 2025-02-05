import { MenuItemTypes } from '@/types/MenuTypes';

import { Order, NewOrder } from '@/types/OrderTypes';

const API_URL = '';

export async function getMenu(): Promise<MenuItemTypes[]> {
  const res = await fetch(`${API_URL}/menu`);

  if (!res.ok) throw Error('Nepodarilo sa ziskat menu');

  const { data } = await res.json();
  return data;
}

export async function getOrder(id: string) {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Nenasla sa objednavka #${id}`);

  const { data } = await res.json();
  return data;
}

export async function createOrder(newOrder: NewOrder): Promise<Order> {
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
    throw Error('Zda sa, ze sa vyskytol problem pri vytvarani objednavky');
  }
}

export async function updateOrder(id: string, updateObj: Partial<Order>): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
  } catch (err) {
    throw Error('Zlyhala urpava tvojej objednavky');
  }
}

