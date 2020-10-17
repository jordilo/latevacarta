import { gql } from 'apollo-angular';

export const UPDATE_ADDRESS = gql`
mutation EditAddress(
    $id: uuid!,
    $address: String,
    $postal_code: Int,
    $state: String,
    $city: String,
    $country: Int,
    $lat: numeric,
    $lng: numeric) {
  update_address_by_pk(
      pk_columns: {id: $id},
      _set: {address: $address, city: $city, country: $country, lat: $lat, lng: $lng, postal_code: $postal_code, state: $state}) {
    id
  }
}
`;
