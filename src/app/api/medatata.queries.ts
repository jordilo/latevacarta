import { gql } from 'apollo-angular';

export const GET_LANGUAGES = gql`
query GetLanguages {
  language {
    code
    name
  }
}`;
