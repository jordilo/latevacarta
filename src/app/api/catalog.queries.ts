import { gql } from 'apollo-angular';

export const GET_ALL_CATEGORIES = gql`
query GetAllCategories {
  category {
    id
    name
    parent_id
  }
}`;

export const GET_CATEGORY = gql`
query GetCategory($categoryId:uuid!) {
  category_by_pk(id: $categoryId){
    id
    name
    parent_id
  }
}`;

export const INSERT_CATEGORY = gql`
mutation InsertCategory($category : category_insert_input!) {
  insert_category_one(object: $category){
     id
  }
}`;

export const UPDATE_CATEGORY = gql`
mutation UPDATE_CATEGORY($id: uuid!, $name: String!, $parent_id: String!) {
  update_category_by_pk(pk_columns: {id: $id}, _set: {name: $name, parent_id: $parent_id}) {
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
