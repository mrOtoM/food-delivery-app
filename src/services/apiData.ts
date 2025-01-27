import { MenuItemTypes } from "@/types/MenuTypes";

const API_URL = "";

export async function getMenu(): Promise<MenuItemTypes[]> {
  const res = await fetch(`${API_URL}/menu`);

  if (!res.ok) throw Error("Failed getting menu");

  const { data } = await res.json();
  return data;
}
