import Button from '@/ui/Button';
import LinkButton from '@/ui/LinkButton';
import CartItem from './CartItem';
import { useAppSelector } from '@/store/hooks';

const fakeCart = [
  {
    id: 12,
    name: 'Polo pizza',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    id: 6,
    name: 'Zeleninova pizza',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    id: 11,
    name: 'Spenatova pizza',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const cart = fakeCart;
  const username = useAppSelector((state) => state.user.username);

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Naspat na menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Tvoja karta, {username}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new">Objednaj pizzu</Button>
        <Button type="secondary">Vycistit kartu</Button>
      </div>
    </div>
  );
}

export default Cart;

