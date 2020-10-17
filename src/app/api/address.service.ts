import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Address } from './business';
import { UPDATE_ADDRESS } from './address.queries';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private apollo: Apollo) { }

  public updateAddress(address: Address) {
    return this.apollo.mutate<Address>({
      mutation: UPDATE_ADDRESS,
      variables: address
    });
  }
}
