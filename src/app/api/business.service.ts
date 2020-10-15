import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Business } from './business';
import { Observable } from 'rxjs';

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
}
