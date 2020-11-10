import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { AuthModule } from '../auth/auth.module';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackendUrlProvider } from './backend-url';
import { ComponentsModule } from './components/components.module';
import { GraphQLModule } from './graphql.module';
import { HeaderComponent } from './header.component';
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
import { ProductHighlightComponent } from './views/product-highlight/product-highlight.component';
import { FilterUsedProductsPipe } from './views/product-highlight/filter-used-products.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    MainComponent,
    BusinessCreationComponent,
    BusinessComponent,
    NotFoundComponent,
    BusinessDetailComponent,
    BusinessEditionComponent,
    BusinessListComponent,
    CatalogComponent,
    BusinessIsolationComponent,
    CatalogSummaryComponent,
    CatalogCategoriesComponent,
    CatalogProductsComponent,
    CategoryListComponent,
    CategoryEditionComponent,
    CategoryCreationComponent,
    ProductEditionComponent,
    ProductListComponent,
    ProductCreationComponent,
    AccountIsolationComponent,
    AccountEditionComponent,
    BusinessQrComponent,
    AccountListComponent,
    ProductHighlightComponent,
    FilterUsedProductsPipe,
  ],
  imports: [
    AuthModule.forRoot(environment.auth),
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    ComponentsModule,
    ReactiveFormsModule,
    NgxQRCodeModule,
  ],
  providers: [BackendUrlProvider],
  bootstrap: [AppComponent],
})
export class AppModule { }
