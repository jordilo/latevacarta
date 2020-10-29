import { gql } from 'apollo-angular';

export const GET_ACCOUNT_QUERY = gql`
query GetAccount($userId: String!) {
  account(where: {auth0_id: {_eq: $userId}}){
    birthday
    creation
    email
    id
    lastname
    last_seen
    thumbnail
    username
    name
  }
}
`;
export const GET_ACCOUNTS_QUERY = gql`
query GetAccounts {
  account{
    birthday
    creation
    email
    id
    lastname
    last_seen
    thumbnail
    username
    name
  }
}
`;

export const UPDATE_ACCOUNT = gql`
mutation UpdateAccount(
  $id: uuid!,
  $lastname: String!,
  $name: String!) {
  update_account_by_pk(pk_columns: {id: $id}, _set: {lastname: $lastname, name: $name}){
    id
  }
}`;
