import { IAccount } from './api/account.d';
import { Component, EventEmitter, Output, Input, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { EXPIRES_AT_KEY, TOKEN_KEY, TOKEN_ID, USER_ID } from 'src/auth/auth.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header',
  templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit {
  @Input() public title: string;
  @Input() public user: IAccount;
  @Input() public isUserLogged: boolean;
  @Output() public logoutHandler: EventEmitter<any> = new EventEmitter();
  @Output() public loginHandler: EventEmitter<any> = new EventEmitter();

  public isMaingPage: boolean;

  public get isLoggedUserInError(): boolean {
    return !this.isUserLogged &&
      (
        Boolean(localStorage.getItem(EXPIRES_AT_KEY)),
        Boolean(localStorage.getItem(TOKEN_KEY)),
        Boolean(localStorage.getItem(TOKEN_ID)),
        Boolean(localStorage.getItem(USER_ID))
      );
  }

  constructor(
    private activeRouter: Router,
    private location: Location,
    private cdr: ChangeDetectorRef) { }

  public ngOnInit() {
    this.activeRouter.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          this.isMaingPage = true;
        } else {
          this.isMaingPage = false;
        }
        this.cdr.detectChanges();
      }
    });
  }

  public logout() {
    this.logoutHandler.emit();
  }
  public login() {
    this.loginHandler.emit();
  }
  public goBack() {
    this.location.back();
  }
}
