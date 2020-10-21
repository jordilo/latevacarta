export interface IBusiness {
  id: string;
  address: IAddress;
  name: string;
  slug: string;
  state: string;
  type: 'BAR' | 'PUB' | 'RES';
  business_meta: IBusinesMeta[]
}


export interface IBusinesMeta {
  id: string;
  name: 'font';
  value: string;
  business_id: string;
}

export interface IAddress {
  address: string;
  city: string;
  country: number;
  id: string;
  lat: number;
  lng: number;
  postal_code: number;
  state: string;
}
