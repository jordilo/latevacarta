import { gql } from 'apollo-angular';

//#region Categories
export const GET_ALL_CATEGORIES = gql`
query GetAllCategories($businessId: uuid!) {
  category(where: {business_id: { _eq : $businessId}}){
    id
    name
    parent_category
  }
}`;

export const GET_CATEGORY = gql`
query GetCategory($categoryId:uuid!) {
  category_by_pk(id: $categoryId){
    id
    name
    parent_category
  }
}`;

export const INSERT_CATEGORY = gql`
mutation InsertCategory($category : category_insert_input!) {
  insert_category_one(object: $category){
     id
  }
}`;

export const UPDATE_CATEGORY = gql`
mutation UPDATE_CATEGORY($id: uuid!,$name: String!,$parent_category: uuid!) {
  update_category_by_pk(pk_columns: {id: $id},_set: {name: $name,parent_category: $parent_category}) {
    id
    name
  }
}`;

export const REMOVE_CATEGORY = gql`
mutation RemoveCategory($id: uuid!) {
  delete_category_by_pk(id: $id){
    id
  }
}`;
//#endregion

//#region Products

export const GET_ALL_PRODUCTS = gql`
query GetProducts($businessId : uuid!) {
  product(where: {category: {business_id: {_eq: $businessId}}}) {
    category {
      id
      name
    }
    description
    id
    name
    price
  }
}`;
export const GET_PRODUCT_BY_ID = gql`
query GetProductById($id:uuid!) {
  product_by_pk(id: $id){
    category {
      id
      name
    }
    category_id
    description
    id
    name
    price
  }
}`;

export const INSERT_PRODUCT = gql`
mutation InsertProduct($product: product_insert_input!) {
    insert_product_one(object: $product){
        id
    }
}`;

export const UPDATE_PRODUCT = gql`
mutation UpdateProduct(
    $id: uuid!,
    $price: numeric,
    $name: String!,
    $description: String,
    $feature_image: String,
    $category_id: uuid!,
    $is_active: Boolean
) {
    update_product_by_pk(pk_columns: {id: $id},
    _set: {
        category_id: $category_id,
        description: $description,
        is_active: $is_active,
        name: $name,
        feature_image: $feature_image,
        price: $price}) {
      name
      price
    }
  }`;

export const REMOVE_PRODUCT = gql`
mutation RemoveProduct($id: uuid!) {
    delete_product_by_pk(id: $id){
        id
    }
}`;

//#endregion

//#region Catalog
export const GET_CATALOG = gql`
query GetCatalogByBusiness($businessId: uuid!) {
  category(where: {parent_category : {_is_null:true},business_id: { _eq : $businessId}}){
    ...categoryModel
    }
}
fragment categoryModel on category {
  id
  name
  categories{
    id
  	name
    products {
      id
      name
      description
      price
  	}
  }
  products {
      id
      name
      description
      price
  }
}

`;

//#endregion
