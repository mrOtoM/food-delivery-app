import { useLoaderData, LoaderFunctionArgs } from 'react-router-dom';

import { calcMinutesLeft, formatCurrency, formatDate } from '@/utils/helpers';
import { getOrder } from '@/services/apiData';

import type { Order } from '@/types/OrderTypes';

function Order() {
  const order = useLoaderData();

  const { id, status, priority, priorityPrice, orderPrice, estimatedDelivery, cart } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div>
      <div>
        <h2>Stav</h2>

        <div>
          {priority && <span>Priorita</span>}
          <span> {status} objednavka</span>
        </div>
      </div>

      <div>
        <p>
          {deliveryIn >= 0 ? `Zostava len  ${calcMinutesLeft(estimatedDelivery)} minut` : 'Objednavka by mala uz prist'}
        </p>
        <p>(Predpokladané doručenie: {formatDate(estimatedDelivery)})</p>
      </div>

      <div>
        <p>Cena pizze: {formatCurrency(orderPrice)}</p>
        {priority && <p>Cena za uprednostnie objednavky: {formatCurrency(priorityPrice)}</p>}
        <p>Postovne: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const order = await getOrder(params.id as string);
  console.log(order);
  return order;
};

export default Order;

