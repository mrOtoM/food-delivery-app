import Button from '@/ui/Button';
import { formatCurrency } from '@/utils/helpers';

import type { MenuItemTypes } from '@/types/MenuTypes';

type MenuItemProps = {
  item: MenuItemTypes;
};

function MenuItem({ item }: MenuItemProps) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = item;

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
          <Button type="small">Pridat</Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;

