import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/auth/admin.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AccountEditionComponent } from './views/account-edition/account-edition.component';
import { AccountIsolationComponent } from './views/account-isolation/account-isolation.component';
import { AccountListComponent } from './views/account-list/account-list.component';
import { BusinessCreationComponent } from './views/business-creation/business-creation.component';
import { BusinessDetailComponent } from './views/business-detail/business-detail.component';
import { BusinessEditionComponent } from './views/business-edition/business-edition.component';
import { BusinessIsolationComponent } from './views/business-isolation/business-isolation.component';
import { BusinessListComponent } from './views/business-list/business-list.component';
import { BusinessQrComponent } from './views/business-qr/business-qr.component';
import { BusinessComponent } from './views/business/business.component';
import { CatalogCategoriesComponent } from './views/catalog-categories/catalog-categories.component';
import { CatalogProductsComponent } from './views/catalog-products/catalog-products.component';
import { CatalogSummaryComponent } from './views/catalog-summary/catalog-summary.component';
import { CatalogComponent } from './views/catalog/catalog.component';
import { CategoryCreationComponent } from './views/category-creation/category-creation.component';
import { CategoryEditionComponent } from './views/category-edition/category-edition.component';
import { CategoryListComponent } from './views/category-list/category-list.component';
import { MainComponent } from './views/main/main.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { ProductCreationComponent } from './views/product-creation/product-creation.component';
import { ProductEditionComponent } from './views/product-edition/product-edition.component';
import { ProductListComponent } from './views/product-list/product-list.component';
import { ProfileComponent } from './views/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [
      AuthGuard,
    ],
  },
  {
    path: '',
    outlet: 'sidebar',
    component: SidebarComponent,
  },
  {
    path: 'business',
    component: BusinessComponent,
    canActivate: [
      AuthGuard,
    ],
    children: [
      {
        path: '',
        component: BusinessListComponent,
      },
      {
        path: 'create',
        component: BusinessCreationComponent,
      },
      {
        path: ':businessId',
        component: BusinessIsolationComponent,
        children: [
          {
            path: '',
            component: BusinessDetailComponent,
            pathMatch: 'full',
          },
          {
            path: 'qr',
            component: BusinessQrComponent,
          },
          {
            path: 'edit',
            component: BusinessEditionComponent,
          },
          {
            path: 'catalog',
            component: CatalogComponent,
            children: [
              {
                path: '',
                component: CatalogSummaryComponent,
              },
              {
                path: 'categories',
                component: CatalogCategoriesComponent,
                children: [
                  {
                    path: '',
                    component: CategoryListComponent,
                  },
                  {
                    path: 'create',
                    component: CategoryCreationComponent,
                  },
                  {
                    path: ':categoryId/edit',
                    component: CategoryEditionComponent,
                  },
                ],
              },
              {
                path: 'products',
                component: CatalogProductsComponent,
                children: [
                  {
                    path: '',
                    component: ProductListComponent,
                  },
                  {
                    path: 'create',
                    component: ProductCreationComponent,
                  },
                  {
                    path: ':productId/edit',
                    component: ProductEditionComponent,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'account-list',
    component: AccountListComponent,
    canActivate: [
      AdminGuard,
    ],
  },
  {
    path: 'account',
    component: AccountIsolationComponent,
    canActivate: [
      AuthGuard,
    ],
    children: [
      {
        path: '',
        component: ProfileComponent,
      },
      {
        path: 'edit',
        component: AccountEditionComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always',
};
@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfiguration)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
