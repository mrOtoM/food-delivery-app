import Button from '@/ui/Button';
import LinkButton from '@/ui/LinkButton';
import CartItem from '@/features/cart/CartItem';
import { clearCart, getCart } from '@/features/cart/cartSlice';
import { getUsername } from '@/features/user/userSlice';
import EmptyCart from '@/features/cart/EmptyCart';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

function Cart() {
  const username = useAppSelector(getUsername);
  const currentCart = useAppSelector(getCart);
  const dispatch = useAppDispatch();

  if (!currentCart.length) {
    return <EmptyCart />;
  }

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Naspat na menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Tvoja karta, {username}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {currentCart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new">Zavazne objednat</Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Vycistit kartu
        </Button>
      </div>
    </div>
  );
}

export default Cart;

