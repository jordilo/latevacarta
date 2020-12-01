import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/auth/auth.service';

export interface IRouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    isExact: boolean;
    needsAdmin?: boolean;
}

export const ROUTES: IRouteInfo[] = [
    { path: '/', title: 'Dashboard', icon: 'nc-world-2', class: '', isExact: true },
    { path: '/account', title: 'My Account', icon: 'nc-single-02', class: '', isExact: true },
    { path: '/account-list', title: 'All accounts', icon: 'nc-laptop', class: '', needsAdmin: true, isExact: false },
    { path: '/business', title: 'Business', icon: 'nc-shop', class: '', isExact: false },

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
    ngOnInit() {
        this.authService.user$.subscribe(() => {
            this.filterItems();
        });

    }

    private filterItems() {
        this.menuItems = ROUTES.filter((menuItem) => {
            if (!menuItem.needsAdmin) {
                return true;
            } else {
                return this.isAdmin;
            }
        });
    }

}
