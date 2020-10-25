import { ILanguageTranslations } from './api.d';
export interface ICategory {
    id: string;
    parent_category: string;
    name: string;
    business_id: string;
    products: IProduct[];
    categories: ICategory[];
    name_languages: ICategoryNames[];
}

export interface ICategoryNames extends ILanguageTranslations {
    category_id: string;
}
export interface IProductTranslations extends ILanguageTranslations {
    product_id: string;
}
export interface IProduct {
    category: ICategory;
    category_id: string;
    description: string;
    feature_image: string;
    id: string;
    is_active: boolean;
    name: string;
    business_id: string;
    price: number;
    name_languages: IProductTranslations[];
    description_languages: IProductTranslations[];
}
