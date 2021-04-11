import { gql } from 'apollo-angular';

export const BUSINESS_FULL_QUERY = gql`
query GetFullBusiness {
  business {
    id
    default_lang
    logotype
    template_id
    languages {
      language
    }
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
    default_lang
    logotype
    languages {
      __typename
      language
    }
    template_id
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
    business_meta{
      id
      name
      value
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
mutation UpdateBusiness(
  $id: uuid!,
  $name: String!,
  $type: String!,
  $template_id: uuid,
  $logotype: String!,
  $default_lang: language_enum!,
  $languages: [business_languages_insert_input!]!
  ) {
  update_business_by_pk(pk_columns: {id: $id}, _set:
    {name: $name , logotype: $logotype, type: $type, template_id: $template_id, default_lang: $default_lang}) {
    id
  }
  delete_business_languages(where: {business_id: {_eq: $id}}) {
    affected_rows
  }
  insert_business_languages(objects : $languages){
    affected_rows
  }

}`;

export const DELETE_BUSINESS = gql`
mutation EditAddress($id: uuid!) {
    delete_business_by_pk(id: $id) {
        id
    }
}`;

export const REMOVE_METADATA = gql`
mutation MyMutation($businessId: uuid, $metadata: [business_meta_insert_input!]!) {
  delete_business_meta(where: {business_id: {_eq: $businessId}}) {
    affected_rows
  }
  insert_business_meta(objects: $metadata){
    affected_rows
  }
}`;
