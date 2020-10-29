import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './../../auth/auth.service';
import { IAccount } from './account';
import { GET_ACCOUNT_QUERY, GET_ACCOUNTS_QUERY, UPDATE_ACCOUNT } from './account.queries';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  constructor(private apollo: Apollo, private auth: AuthService) { }

  public get isAdmin() {
    return this.auth.isAdmin;
  }
  public getAccount(): Observable<IAccount> {
    return this.apollo.watchQuery<{ account: IAccount[] }>({
      query: GET_ACCOUNT_QUERY,
      variables: {
        userId: localStorage.getItem('user_id'),
      },
    }).valueChanges.pipe(map((response) => response.data.account[0]));
  }
  public getAccounts(): Observable<IAccount[]> {
    return this.apollo.watchQuery<{ account: IAccount[] }>({
      query: GET_ACCOUNTS_QUERY,
    }).valueChanges.pipe(map((response) => response.data.account));
  }

  public updateAccount(account: IAccount) {
    return this.apollo.mutate({
      mutation: UPDATE_ACCOUNT,
      variables: {
        id: account.id,
        name: account.name,
        lastname: account.lastname,
      },
      refetchQueries: [{
        query: GET_ACCOUNT_QUERY,
        variables: {
          userId: localStorage.getItem('user_id'),
        },
      }],
    });
  }

}
