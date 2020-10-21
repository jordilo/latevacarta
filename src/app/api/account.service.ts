import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { GET_ACCOUNT_QUERY, UPDATE_ACCOUNT } from './account.queries';
import { IAccount } from './account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private apollo: Apollo) { }

  public getAccount(): Observable<IAccount> {
    return this.apollo.watchQuery<{ account: IAccount[] }>({
      query: GET_ACCOUNT_QUERY,
      variables: {
        userId: localStorage.getItem('user_id')
      }
    }).valueChanges.pipe(map((response) => response.data.account[0]));
  }

  public updateAccount(account: IAccount) {
    return this.apollo.mutate({
      mutation: UPDATE_ACCOUNT,
      variables: {
        id: account.id,
        name: account.name,
        lastname: account.lastname
      }
    });
  }

}
