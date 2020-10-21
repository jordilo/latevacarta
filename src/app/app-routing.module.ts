import { AccountListComponent } from './views/account-list/account-list.component';
import { BusinessEditionComponent } from './views/business-edition/business-edition.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/auth/auth.guard';
import { BusinessCreationComponent } from './views/business-creation/business-creation.component';
import { BusinessDetailComponent } from './views/business-detail/business-detail.component';
import { BusinessComponent } from './views/business/business.component';
import { MainComponent } from './views/main/main.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { ProfileComponent } from './views/profile/profile.component';
import { BusinessListComponent } from './views/business-list/business-list.component';
import { CatalogComponent } from './views/catalog/catalog.component';
import { BusinessIsolationComponent } from './views/business-isolation/business-isolation.component';
import { CatalogSummaryComponent } from './views/catalog-summary/catalog-summary.component';
import { CatalogProductsComponent } from './views/catalog-products/catalog-products.component';
import { CatalogCategoriesComponent } from './views/catalog-categories/catalog-categories.component';
import { CategoryListComponent } from './views/category-list/category-list.component';
import { CategoryEditionComponent } from './views/category-edition/category-edition.component';
import { CategoryCreationComponent } from './views/category-creation/category-creation.component';
import { ProductListComponent } from './views/product-list/product-list.component';
import { ProductCreationComponent } from './views/product-creation/product-creation.component';
import { ProductEditionComponent } from './views/product-edition/product-edition.component';
import { AccountEditionComponent } from './views/account-edition/account-edition.component';
import { AccountIsolationComponent } from './views/account-isolation/account-isolation.component';
import { BusinessQrComponent } from './views/business-qr/business-qr.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'business',
    component: BusinessComponent,
    canActivate: [
      AuthGuard
    ],
    children: [
      {
        path: '',
        component: BusinessListComponent
      },
      {
        path: 'create',
        component: BusinessCreationComponent
      },
      {
        path: ':businessId',
        component: BusinessIsolationComponent,
        children: [
          {
            path: '',
            component: BusinessDetailComponent,
            pathMatch: 'full'
          },
          {
            path: 'qr',
            component: BusinessQrComponent
          },
          {
            path: 'edit',
            component: BusinessEditionComponent
          },
          {
            path: 'catalog',
            component: CatalogComponent,
            children: [
              {
                path: '',
                component: CatalogSummaryComponent
              },
              {
                path: 'categories',
                component: CatalogCategoriesComponent,
                children: [
                  {
                    path: '',
                    component: CategoryListComponent
                  },
                  {
                    path: 'create',
                    component: CategoryCreationComponent
                  },
                  {
                    path: ':categoryId/edit',
                    component: CategoryEditionComponent
                  }
                ]
              },
              {
                path: 'products',
                component: CatalogProductsComponent,
                children: [
                  {
                    path: '',
                    component: ProductListComponent
                  },
                  {
                    path: 'create',
                    component: ProductCreationComponent
                  },
                  {
                    path: ':productId/edit',
                    component: ProductEditionComponent
                  }
                ]
              },
            ]
          }
        ]
      },
    ]
  },
  {
    path: 'account-list',
    component: AccountListComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'account',
    component: AccountIsolationComponent,
    canActivate: [
      AuthGuard
    ],
    children: [
      {
        path: '',
        component: ProfileComponent
      },
      {
        path: 'edit',
        component: AccountEditionComponent
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
