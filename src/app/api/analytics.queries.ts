import { gql } from 'apollo-angular';

export const ANALYTICS_QUERY = gql`
query MyQuery($businessId: uuid!, $eventName: String!) {
  analytics(input: {businessId: $businessId, eventName: $eventName}) {
    data
    dates
    total
    eventName
  }
}
`;
