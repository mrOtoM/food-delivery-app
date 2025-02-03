import { formatCurrency } from '@/utils/helpers';
import DeleteItem from './DeleteItem';

import type { CartItem } from '@/types/OrderTypes';

type CartItemProps = {
  item: CartItem;
};

function CartItem({ item }: CartItemProps) {
  const { id, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <DeleteItem id={id} />
      </div>
    </li>
  );
}

export default CartItem;

