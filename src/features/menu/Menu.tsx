import { useLoaderData } from "react-router-dom";

import { getMenu } from "@/services/apiData";
import { MenuItemTypes } from "@/types/MenuTypes";
import MenuItem from "@/features/menu/MenuItem";

function Menu() {
  const menu = useLoaderData() as MenuItemTypes[];
  console.log(menu);

  return (
    <ul>
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
