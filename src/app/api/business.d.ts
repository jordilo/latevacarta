import { ILanguage } from './metadata.d';
export interface IBusiness {
  id: string;
  address: IAddress;
  name: string;
  slug: string;
  state: string;
  logotype: string;
  type: 'BAR' | 'PUB' | 'RES';
  business_meta: IBusinesMeta[];
  default_lang: string;
  languages: IBusinessLanguage[];
  template_id: string;
  template: ITemplate;
}

export interface ITemplate {
  id: string;
  name: string;
  reference: string;
}

export interface IBusinessLanguage {
  business_id: string;
  language: string;
}

export type BusinessMetaEnum = 'font' | 'facebook' | 'tiktok' | 'instagram' | 'web' | 'youtube' | 'whatsapp' | 'email' | 'phone';
export interface IBusinesMeta {
  id: string;
  name: BusinessMetaEnum;
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
