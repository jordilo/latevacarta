export interface ICategory {
    id: string;
    parent_category: string;
    name: string;
    business_id: string;
    products: IProduct[];
    categories: ICategory[];
}

export interface IProduct {
    category: ICategory;
    category_id: string;
    description: string;
    feature_image: string;
    id: string;
    is_active: boolean;
    name: string;
    price: number;
}