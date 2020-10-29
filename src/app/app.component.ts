import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { environment } from '../environments/environment';
import { IAccount } from './api/account.d';
import { AccountService } from './api/account.service';
import { ACCOUNT_ID_KEY } from './constants';
@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {

  public appInfo = {
    name: environment.appName,
    version: environment.version,
  };
  public get isUserLogged(): boolean {
    return this.auth.isLoggedIn;
  }
  public user$: Observable<IAccount>;

  constructor(private auth: AuthService, private accountService: AccountService) {
    this.user$ =
      this.auth.user$.pipe(
        filter((user) => user !== null || Boolean(localStorage.getItem(ACCOUNT_ID_KEY))),
        switchMap(() => this.accountService.getAccount()),
        tap((userFromDb) => localStorage.setItem(ACCOUNT_ID_KEY, userFromDb.id)),
      );
  }

  public logoutHandler() {
    this.auth.logout();
    localStorage.removeItem(ACCOUNT_ID_KEY);
  }

  public loginHandler() {
    this.auth.authorize();
  }

}
