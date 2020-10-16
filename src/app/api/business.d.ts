export interface Business {
  id: string;
  address: Address;
  name: string;
  slug: string;
  state: string;
  type: 'BAR' | 'PUB' | 'RES';
}

export interface Address {
  address: string;
  city: string;
  country: number;
  id: string;
  lat: number;
  lng: number;
  postal_code: number;
  state: string;
}
