export interface ICategory {
    id: string;
    parent_id: string;
    name: string;
    business_id: string;
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