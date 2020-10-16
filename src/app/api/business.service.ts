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
mutation MyMutation {
  insert_business_one(object: {name: "SBD", slug: "d", type: "BAR", address: {data: {address: "dd", city: "ddd", country: 1, lat: "2", lng: "4", postal_code: 5, state: "BCN"}}, account_id: "56fe42a3-dce4-451a-8ac1-b05699f8718c"}, on_conflict: {update_columns: address_id, constraint: business_id_key}) {
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
    return this.apollo.watchQuery<{ business: Business[] }>({
      query: BUSINESS_FULL_QUERY
    }).valueChanges.pipe(map((response) => response.data.business));
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
