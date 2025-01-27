import { Link } from "react-router-dom";

const fakeCart = [
  {
    pizzaId: 12,
    name: "Polo pizza",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Zeleninova pizza",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spenatova pizza",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const cart = fakeCart;
  cart; //remove

  return (
    <div>
      <Link to="/menu">&larr; Naspat na menu</Link>

      <h2>Tvoja karta, %NAME%</h2>

      <div>
        <Link to="/order/new">Objednaj pizzu</Link>
        <button>Vycistit kartu</button>
      </div>
    </div>
  );
}

export default Cart;
