import { useLoaderData } from 'react-router-dom';

import { getMenu } from '@/services/apiData';
import { MenuItemTypes } from '@/types/MenuTypes';
import MenuItem from '@/features/menu/MenuItem';

function Menu() {
  const menu = useLoaderData() as MenuItemTypes[];
  console.log(menu);

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((item) => (
        <MenuItem item={item} key={item.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;

