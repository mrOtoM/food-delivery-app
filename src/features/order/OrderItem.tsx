import { formatCurrency } from '@/utils/helpers';
import { CartItem } from '@/types/OrderTypes';

type OrderItemProsp = {
  item: CartItem;
  isLoadingIngredients?: boolean;
  ingredients?: string[];
};

function OrderItem({ item, isLoadingIngredients, ingredients }: OrderItemProsp) {
  const { quantity, name, totalPrice } = item;
  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm capitalize italic text-stone-500">
        {isLoadingIngredients
          ? 'Loading...'
          : ingredients && ingredients.length > 0
            ? ingredients.join(', ')
            : 'No ingredients found'}
      </p>
    </li>
  );
}

export default OrderItem;

