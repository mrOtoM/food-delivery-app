import { Link } from 'react-router-dom';

import { useAppSelector } from '@/store/hooks';
import { getTotalCartQuantity, getTotalCartPrice } from '@/features/cart/cartSlice';

function CartOverview() {
  const totalCartQuantity = useAppSelector(getTotalCartQuantity);
  const totalCartPrice = useAppSelector(getTotalCartPrice);

  if (!totalCartQuantity) {
    return null;
  }

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity} poloziek</span>
        <span>{totalCartPrice}€</span>
      </p>
      <Link to="/cart">Otvorit kartu &rarr;</Link>
    </div>
  );
}

export default CartOverview;

