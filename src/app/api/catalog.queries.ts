import { gql } from 'apollo-angular';

export const INSERT_FULL_CATEGORY = gql`
mutation UpdateCategories($categories: [category_insert_input!]!) {
  insert_category(objects: $categories){
    affected_rows
    returning{
      id
    }
  }
}
`;

//#region Categories
export const GET_ALL_CATEGORIES = gql`
query GetAllCategories($businessId: uuid!) {
  category(where: {business_id: { _eq : $businessId}}, order_by: {order: asc}){
    id
    name
    parent_category
    business_id
    order
    name_languages{
      language
      value
    }
  }
}`;

export const GET_CATEGORY = gql`
query GetCategory($categoryId:uuid!) {
  category_by_pk(id: $categoryId){
    id
    name
    parent_category
    business_id
    order
    name_languages{
      language
      value
    }
  }
}`;

export const INSERT_CATEGORY = gql`
mutation InsertCategory($category : category_insert_input!) {
  insert_category_one(object: $category){
     id
  }
}`;

export const UPDATE_CATEGORY = gql`
mutation UPDATE_CATEGORY($id: uuid!,$name: String!,$parent_category: uuid, $languages: [category_name_langs_insert_input!]!) {
  update_category_by_pk(pk_columns: {id: $id},_set: {name: $name,parent_category: $parent_category}) {
    id
    name
  }
  delete_category_name_langs(where: {category_id: {_eq: $id}}){
    affected_rows
  }
  insert_category_name_langs(objects: $languages){
    affected_rows
  }
}`;
export const SORT_CATEGORY = gql`
mutation SortCategories ($categories: [category_insert_input!]!){
  insert_category(objects: $categories , on_conflict:{
    constraint: category_pkey,
    update_columns: [order]
  }){
    affected_rows
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
    business_id
    description
    feature_image
    id
    name
    price
    name_languages{
      language
      value
    }
    description_languages{
      language
      value
    }
  }
}`;
export const GET_PRODUCT_BY_ID = gql`
query GetProductById($id:uuid!) {
  product_by_pk(id: $id){
    category {
      id
      name
    }
    business_id
    category_id
    description
    feature_image
    id
    name
    price
    name_languages{
      language
      value
    }
    description_languages{
      language
      value
    }
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
    $is_active: Boolean,
    $name_languages: [product_name_langs_insert_input!]!,
    $description_languages: [product_description_langs_insert_input!]!,
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
    delete_product_name_langs(where: {product_id: {_eq: $id}}){
      affected_rows
    }
    insert_product_name_langs(objects: $name_languages){
      affected_rows
    }
    delete_product_description_langs(where: {product_id: {_eq: $id}}){
      affected_rows
    }
    insert_product_description_langs(objects: $description_languages){
      affected_rows
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
      categories{
         ...subCategories
      }
    }
  }
  fragment categoryModel on category {
    id
    name
    name_languages{
      language
      value
    }
    products {
        id
        name
        description
        price
    }
  }

  fragment subCategories on category{
    id
    name
    products {
      id
      name
      description
      price
    }
    name_languages{
      language
      value
    }
    categories{
      ...categoryModel
    }
  }
`;

//#endregion

//#region Products Highligted
export const GET_PRODUCTS_HIGHLIGHT = gql`
query GetProductsHighlighted($businessId: uuid = "") {
  product_highlight(where: {business_id: {_eq: $businessId}}){
    product_id
    product{
      name
      id
    }
  }
}`;

export const INSERT_PRODUCTS_HIGHLIGHT = gql`
mutation UpdateHighlightedProducts($businessId: uuid = "" , $productsHighlighted: [product_highlight_insert_input!]!) {
  delete_product_highlight(where: {business_id: {_eq: $businessId}}) {
    affected_rows
  }
  insert_product_highlight(objects: $productsHighlighted){
    affected_rows
  }
}

`;

//#endregion
