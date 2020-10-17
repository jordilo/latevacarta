import { gql } from 'apollo-angular';

export const BUSINESS_FULL_QUERY = gql`
query GetFullBusiness {
  business {
    id
    address {
      address
      city
      country
      id
      lat
      lng
      postal_code
      state
    }
    name
    slug
    type
  }
}`;
export const BUSINESS_ID_QUERY = gql`
query GetBusinessById ($id: uuid!) {
  business_by_pk(id: $id){
    id
    address {
      address
      city
      country
      id
      lat
      lng
      postal_code
      state
    }
    name
    slug
    type
  }
}`;

export const INSERT_BUSINESS = gql`
mutation InsertBusiness($business : business_insert_input!) {
  insert_business_one(
    object: $business) {
    id
    address {
      id
    }
  }
}`;

export const EDIT_BUSINESS = gql`
mutation UpdateBusiness($id: uuid!, $name: String! ,$type: String!) {
  update_business_by_pk(pk_columns: {id: $id}, _set: {name: $name , type: $type}) {
    id
  }
}`;


export const DELETE_BUSINESS = gql`
mutation EditAddress($id: uuid!) {
    delete_business_by_pk(id: $id) {
        id
    }
}`;
