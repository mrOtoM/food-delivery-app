import Button from '@/ui/Button';
import LinkButton from '@/ui/LinkButton';

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Polo pizza',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Zeleninova pizza',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spenatova pizza',
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
      <LinkButton to="/menu">&larr; Naspat na menu</LinkButton>

      <h2>Tvoja karta, %NAME%</h2>

      <div>
        <Button to="/order/new">Objednaj pizzu</Button>
        <Button>Vycistit kartu</Button>
      </div>
    </div>
  );
}

export default Cart;

