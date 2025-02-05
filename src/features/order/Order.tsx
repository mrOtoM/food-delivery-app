import { useLoaderData, LoaderFunctionArgs, useFetcher } from 'react-router-dom';
import { useEffect } from 'react';

import { calcMinutesLeft, formatCurrency, formatDate } from '@/utils/helpers';
import { getOrder } from '@/services/apiData';
import OrderItem from '@/features/order/OrderItem';
import UpdateOrder from '@/features/order/UpdateOrder';

import type { Order } from '@/types/OrderTypes';

function Order() {
  const order = useLoaderData<Order>();

  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') {
      fetcher.load('/menu');
    }
  }, [fetcher]);

  const { id, status, priority, priorityPrice, orderPrice, estimatedDelivery, cart } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Stav objednavky {id}</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 font-semibold uppercase tracking-wide text-red-50">
              Priorita
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 font-semibold uppercase tracking-wide text-green-50">
            {' '}
            {status} objednavka
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p>
          {deliveryIn >= 0
            ? `Zostava len  ${calcMinutesLeft(estimatedDelivery)} minut`
            : 'Objednavka by mala uz prist'}
        </p>
        <p className="text-xs text-stone-500">
          (Predpokladané doručenie: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.id}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={
              fetcher?.data?.find((el) => String(el.id) === String(item.pizzaId))?.ingredients || []
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Cena pizze: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Cena za uprednostnie objednavky: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">Postovne: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>

      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const order = await getOrder(params.id as string);
  return order;
};

export default Order;

