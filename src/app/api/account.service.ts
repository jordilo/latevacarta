import { AuthService } from './../../auth/auth.service';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { GET_ACCOUNTS_QUERY, GET_ACCOUNT_QUERY, UPDATE_ACCOUNT } from './account.queries';
import { IAccount } from './account';

@Injectable({
  providedIn: 'root'
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
        userId: localStorage.getItem('user_id')
      }
    }).valueChanges.pipe(map((response) => response.data.account[0]));
  }
  public getAccounts(): Observable<IAccount[]> {
    return this.apollo.watchQuery<{ account: IAccount[] }>({
      query: GET_ACCOUNTS_QUERY
    }).valueChanges.pipe(map((response) => response.data.account));
  }

  public updateAccount(account: IAccount) {
    return this.apollo.mutate({
      mutation: UPDATE_ACCOUNT,
      variables: {
        id: account.id,
        name: account.name,
        lastname: account.lastname
      },
      refetchQueries: [{
        query: GET_ACCOUNT_QUERY,
        variables: {
          userId: localStorage.getItem('user_id')
        }
      }]
    });
  }

}
