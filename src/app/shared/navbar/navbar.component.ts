import { Location } from '@angular/common';
import { ChangeDetectorRef, EventEmitter, Input, Output } from '@angular/core';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IAccount } from 'src/app/api/account';
import { EXPIRES_AT_KEY, TOKEN_ID, TOKEN_KEY, USER_ID } from 'src/auth/auth.service';
import { ROUTES } from '../../sidebar/sidebar.component';

@Component({
  moduleId: module.id,
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html',
})

export class NavbarComponent implements OnInit {

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

  private listTitles: any[];
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;

  public isCollapsed = true;
  @ViewChild('navbar-cmp', { static: false }) button;

  constructor(
    private location: Location,
    private renderer: Renderer2,
    private element: ElementRef,
    private cdr: ChangeDetectorRef,
    private router: Router) {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          this.isMaingPage = true;
        } else {
          this.isMaingPage = false;
        }
        this.cdr.detectChanges();
      }
    });
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
    });
  }
  getTitle() {
    // let titlee = this.location.prepareExternalUrl(this.location.path());
    // if (titlee.charAt(0) === '/') {
    //   titlee = titlee.slice(1);
    // }
    // console.log(titlee);
    // // tslint:disable-next-line:prefer-for-of
    // for (let item = 0; item < this.listTitles.length; item++) {
    //   if (this.listTitles[item].path === titlee) {
    //     return this.listTitles[item].title;
    //   }
    // }
    return 'Dashboard';
  }
  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = document.getElementsByClassName('main-panel')[0] as HTMLElement;
    setTimeout(() => {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }
    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = document.getElementsByClassName('main-panel')[0] as HTMLElement;
    if (window.innerWidth < 991) {
      setTimeout(() => {
        mainPanel.style.position = '';
      }, 500);
    }
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }
  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }

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
