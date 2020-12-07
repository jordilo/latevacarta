import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/auth/auth.service';

export interface IRouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    isExact: boolean;
    needsAdmin?: boolean;
    notLogged?: boolean;
}

export const ROUTES: IRouteInfo[] = [
    { path: '/', title: 'Dashboard', icon: 'nc-world-2', class: '', isExact: true },
    { path: '/account', title: 'My Account', icon: 'nc-single-02', class: '', isExact: false },
    { path: '/account-list', title: 'All accounts', icon: 'nc-laptop', class: '', needsAdmin: true, isExact: false },
    { path: '/business', title: 'Business', icon: 'nc-shop', class: '', isExact: false },
    { path: '/login', title: 'Login', icon: 'nc-single-02', class: '', isExact: true, notLogged: true },
    { path: '/password-reset', title: 'Password reset', icon: 'nc-email-85', class: '', isExact: true, notLogged: true },
    { path: '/signup', title: 'Signup', icon: 'nc-sun-fog-29', class: '', isExact: true, notLogged: true },

];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];

    constructor(public authService: AuthService) { }

    public get isAdmin(): boolean {
        return this.authService.isAdmin;
    }
    public get isLoggedIn(): boolean {
        return this.authService.isLoggedIn;
    }
    ngOnInit() {
        this.authService.user$.subscribe(() => {
            this.filterItems();
        });

    }

    private filterItems() {
        this.menuItems = ROUTES.filter((menuItem) => {
            if (this.isLoggedIn && !menuItem.notLogged && !menuItem.needsAdmin) {
                return true;
            } else if (menuItem.notLogged && !this.isLoggedIn) {
                return true;
            } else if (menuItem.needsAdmin) {
                return this.isAdmin;
            }
            return false;
        });
    }

}
