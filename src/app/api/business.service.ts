import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { IBusiness, IBusinesMeta } from './business';
import { Observable } from 'rxjs';
import { ACCOUNT_ID_KEY } from '../constants';
import {
  BUSINESS_FULL_QUERY,
  BUSINESS_ID_QUERY,
  INSERT_BUSINESS,
  EDIT_BUSINESS,
  DELETE_BUSINESS,
  REMOVE_METADATA
} from './business.queries';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private apollo: Apollo) { }

  public getAll(): Observable<IBusiness[]> {
    return this.apollo.subscribe<{ business: IBusiness[] }>({
      query: BUSINESS_FULL_QUERY
    }).pipe(map((response) => response.data.business));
  }
  public getById(id: string): Observable<IBusiness> {
    return this.apollo.subscribe<{ business_by_pk: IBusiness }>({
      query: BUSINESS_ID_QUERY,
      variables: { id }
    }).pipe(map((response) => response.data.business_by_pk));
  }
  public create(business: IBusiness): Observable<any> {
    delete business.address.id;
    const businnesGQL = {
      name: business.name,
      type: business.type,
      account_id: localStorage.getItem(ACCOUNT_ID_KEY),
      business_meta: { data: business.business_meta },
      address: {
        data: business.address
      }
    };
    return this.apollo.mutate<any>({
      // query: BUSINESS_FULL_QUERY
      mutation: INSERT_BUSINESS,
      variables: {
        business: businnesGQL
      },
      refetchQueries: [
        { query: BUSINESS_FULL_QUERY }
      ]
    }).pipe(map(({ data }) => data.insert_business_one));
  }

  public edit(business: IBusiness) {
    return this.apollo.mutate<IBusiness>({
      mutation: EDIT_BUSINESS,
      variables: {
        id: business.id,
        name: business.name,
        type: business.type
      },
      refetchQueries: [
        { query: BUSINESS_FULL_QUERY },
        {
          query: BUSINESS_ID_QUERY,
          variables: { id: business.id }
        }
      ]
    });
  }

  public setMetadata(metadata: IBusinesMeta[], businessId: string) {

    metadata.forEach((m) => m.business_id = businessId);
    return this.apollo.mutate<any>({
      mutation: REMOVE_METADATA,
      variables: {
        metadata,
        businessId
      }
    });
  }

  public remove(businessId: string) {
    return this.apollo.mutate<IBusiness>({
      mutation: DELETE_BUSINESS,
      variables: {
        id: businessId
      },
      refetchQueries: [
        { query: BUSINESS_FULL_QUERY }
      ]
    });
  }
}
