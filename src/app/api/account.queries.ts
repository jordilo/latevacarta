import { gql } from 'apollo-angular';

export const GET_ACCOUNT_QUERY = gql`
query GetAccount {
  account {
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
