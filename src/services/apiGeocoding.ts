interface Coordinates {
  latitude: number;
  longitude: number;
}

interface AddressResponse {
  city?: string;
  locality?: string;
  postcode?: string;
  countryName?: string;
}

export const getAddress = async ({
  latitude,
  longitude,
}: Coordinates): Promise<AddressResponse> => {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`,
  );
  if (!res.ok) throw new Error('Failed getting address');

  const data = await res.json();
  return data;
};

