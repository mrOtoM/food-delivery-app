import { formatCurrency } from '@/utils/helpers';
import DeleteItem from '@/features/cart/DeleteItem';
import UpdateItemQuantity from '@/features/cart/UpdateItemQuantity';
import { useAppSelector } from '@/store/hooks';
import { getCurrentQuantityById } from '@/features/cart/cartSlice';

import type { CartItem } from '@/types/OrderTypes';

type CartItemProps = {
  item: CartItem;
};

function CartItem({ item }: CartItemProps) {
  const { id, name, quantity, totalPrice } = item;

  const currentQuantity = useAppSelector(getCurrentQuantityById(id));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity id={id} currentQuantity={currentQuantity} />
        <DeleteItem id={id} />
      </div>
    </li>
  );
}

export default CartItem;

