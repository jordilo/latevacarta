import { gql } from 'apollo-angular';

export const GET_LANGUAGES = gql`
query GetLanguages {
  language {
    code
    name
  }
}`;

export const GET_TEMPLATES = gql`
query GetTemplates {
  templates {
    id
    name
    reference
  }
}`;
