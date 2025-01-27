// Test ID: IIDSAT

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";

const order = {
  id: "ABCDEF",
  status: "Cakajuca",
  customer: "Oto",
  phone: "123456789",
  address: "Arroios, Trenicn , Slovakia",
  priority: true,
  estimatedDelivery: "2025-04-25T10:00:00",
  cart: [
    {
      pizzaId: 7,
      name: "Napoli",
      quantity: 3,
      unitPrice: 16,
      totalPrice: 48,
    },
    {
      pizzaId: 5,
      name: "Diavola",
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
  ],
  position: "-9.000,38.000",
  orderPrice: 95,
  priorityPrice: 19,
};

function Order() {
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
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
          {deliveryIn >= 0
            ? `Zostava len  ${calcMinutesLeft(estimatedDelivery)} minut`
            : "Objednavka by mala uz prist"}
        </p>
        <p>(Predpokladané doručenie: {formatDate(estimatedDelivery)})</p>
      </div>

      <div>
        <p>Cena pizze: {formatCurrency(orderPrice)}</p>
        {priority && (
          <p>
            Cena za uprednostnie objednavky: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p>Postovne: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}

export default Order;
