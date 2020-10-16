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
const BUSINESS_ID_QUERY = gql`
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
}
`;

const INSERT_BUSINESS = gql`
mutation InsertBusiness($business : business_insert_input!) {
  insert_business_one(
    object: $business) {
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
  public getBusinessById(id: string): Observable<Business> {
    return this.apollo.subscribe<{ business_by_pk: Business }>({
      query: BUSINESS_ID_QUERY,
      variables: { id }
    }).pipe(map((response) => response.data.business_by_pk));
  }
  public addBusiness(business: Business): Observable<any> {
    const businnesGQL = {
      name: business.name,
      type: business.type,
      account_id: localStorage.getItem(ACCOUNT_ID_KEY),
      address: {
        data: business.address
      }
    };
    return this.apollo.mutate<any>({
      // query: BUSINESS_FULL_QUERY
      mutation: INSERT_BUSINESS,
      variables: {
        business: businnesGQL
      }
    });
  }
}
