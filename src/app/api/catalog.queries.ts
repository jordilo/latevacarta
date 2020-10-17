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
