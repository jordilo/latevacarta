import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

const GET_ACCOUNT_QUERY = gql`
query GetAccount {
  account {
    birthday
    creation
    email
    id
    lastname
    last_seen
    thumbnail
    username
    name
  }
}
`;

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
