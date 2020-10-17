import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { GET_ACCOUNT_QUERY } from './account.queries';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private apollo: Apollo) { }

  public getAccount(): Observable<Account> {
    return this.apollo.watchQuery<{ account: Account[] }>({
      query: GET_ACCOUNT_QUERY,
    }).valueChanges.pipe(map((response) => response.data.account[0]));
  }
}
