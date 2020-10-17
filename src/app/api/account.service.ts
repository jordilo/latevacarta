import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { GET_ACCOUNT_QUERY } from './account.queries';
import { IAccount } from './account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private apollo: Apollo) { }

  public getAccount(): Observable<IAccount> {
    return this.apollo.watchQuery<{ account: IAccount[] }>({
      query: GET_ACCOUNT_QUERY,
    }).valueChanges.pipe(map((response) => response.data.account[0]));
  }
}
