import Button from '@/ui/Button';
import { formatCurrency } from '@/utils/helpers';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addItem, getCurrentQuantityById } from '@/features/cart/cartSlice';
import DeleteItem from '@/features/cart/DeleteItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';

import type { MenuItemTypes } from '@/types/MenuTypes';

type MenuItemProps = {
  item: MenuItemTypes;
};

function MenuItem({ item }: MenuItemProps) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = item;
  const currentQuantity = useAppSelector(getCurrentQuantityById(id));
  const dispatch = useAppDispatch();
  const isInCart = currentQuantity > 0;

  const handleAddToCart = () => {
    const newItem = {
      id: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
  };

  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`} />
      <div className="flex flex-grow flex-col pt-1">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">Nedostupne</p>
          )}

          {isInCart && (
            <div className="flex gap-x-2">
              <UpdateItemQuantity id={id} currentQuantity={currentQuantity} />
              <DeleteItem id={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Pridat
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;

