import { AccountService } from './api/account.service';
import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { filter, tap, switchMap } from 'rxjs/operators';
import { ACCOUNT_ID_KEY } from './constants';
import { IAccount } from './api/account.d';
@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {


  public appInfo = {
    name: environment.appName,
    version: environment.version
  };
  public get isUserLogged(): boolean {
    return this.auth.isLoggedIn;
  }
  public user$: Observable<IAccount>;

  constructor(private auth: AuthService, private accountService: AccountService) {
    this.user$ =
      this.auth.user$.pipe(
        filter((user) => user !== null),
        switchMap(() => this.accountService.getAccount()),
        tap(console.log),
        tap((userFromDb) => localStorage.setItem(ACCOUNT_ID_KEY, userFromDb.id))
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
