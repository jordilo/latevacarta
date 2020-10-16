import { AccountService } from './api/account.service';
import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from '../environments/environment';
import { Observable, Subject } from 'rxjs';
import { AuthUser } from 'src/auth/auth';
import { filter, share, tap, switchMap } from 'rxjs/operators';
import { ACCOUNT_ID_KEY } from './constants';
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
  public user$: Observable<AuthUser>;

  constructor(private auth: AuthService, private accountService: AccountService) {
    const usersObservable = this.auth.user$.pipe(filter((user) => user !== null))
      .pipe(share());

    this.user$ = usersObservable;

    usersObservable.pipe(
      switchMap(() =>
        this.accountService.getAccount()
          .pipe(tap((userFromDb) => localStorage.setItem(ACCOUNT_ID_KEY, userFromDb.id)))
      )
    ).subscribe();
  }

  public logoutHandler() {
    this.auth.logout();
    localStorage.removeItem(ACCOUNT_ID_KEY);
  }

  public loginHandler() {
    this.auth.authorize();
  }

}
