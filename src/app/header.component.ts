import { Account } from './api/account.d';
import { Component, EventEmitter, Output, Input, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header',
  templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit {
  @Input() public title: string;
  @Input() public user: Account;
  @Input() public isUserLogged: boolean;
  @Output() public logoutHandler: EventEmitter<any> = new EventEmitter();
  @Output() public loginHandler: EventEmitter<any> = new EventEmitter();

  public isMaingPage: boolean;

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
