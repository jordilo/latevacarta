import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { IAddress } from './business';
import { UPDATE_ADDRESS } from './address.queries';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private apollo: Apollo) { }

  public updateAddress(address: IAddress) {
    return this.apollo.mutate<IAddress>({
      mutation: UPDATE_ADDRESS,
      variables: address
    });
  }
}
