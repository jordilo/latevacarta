import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Business } from './business';
import { Observable } from 'rxjs';
import { ACCOUNT_ID_KEY } from '../constants';

const BUSINESS_FULL_QUERY = gql`
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
}
`;

const INSERT_BUSINESS = gql`
mutation InsertBusiness($accountId : uuid!) {
  insert_business_one(
    object: {
      name: "manolito",
      slug: "d",
      type: "BAR",
      address: {
        data: {
          address: "fghfg",
          city: "ffff pere",
          country: 1, lat: "2",
          lng: "4",
          postal_code: 5,
          state: "BCN"}},
      account_id: $accountId}) {
    id
    address {
      id
    }
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private apollo: Apollo) { }

  public getBusiness(): Observable<Business[]> {

    return this.apollo.subscribe<{ business: Business[] }>({
      query: BUSINESS_FULL_QUERY
    }).pipe(map((response) => response.data.business));
  }
  public addBusiness(business: Business): Observable<any> {
    return this.apollo.mutate<any>({
      // query: BUSINESS_FULL_QUERY
      mutation: INSERT_BUSINESS,
      variables: {
        accountId: localStorage.getItem(ACCOUNT_ID_KEY)
      }
    });
  }
}
