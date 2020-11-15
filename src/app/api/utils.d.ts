interface NameLanguage {
    language: string;
    value: string;
}

interface NameLanguage2 {
    language: string;
    value: string;
}

interface DescriptionLanguage {
    language: string;
}

interface Datum {
    name: string;
    name_languages: NameLanguage2[];
    description_languages: DescriptionLanguage[];
    price: number;
}

interface Products {
    data: Datum[];
}

interface RootObject {
    business_id: string;
    name_languages: NameLanguage[];
    name: string;
    products: Products;
}

export type InsertFullCatalog = RootObject[];
