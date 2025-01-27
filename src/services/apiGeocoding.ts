interface Coordinates {
  latitude: number;
  longitude: number;
}

export const getAddress = async ({
  latitude,
  longitude,
}: Coordinates): Promise<any> => {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );
  if (!res.ok) throw new Error("Failed getting address");

  const data = await res.json();
  return data;
};
