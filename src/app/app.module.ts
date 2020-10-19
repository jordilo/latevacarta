import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { AuthModule } from '../auth/auth.module';
import { MainComponent } from './views/main/main.component';
import { ProfileComponent } from './views/profile/profile.component';
import { environment } from '../environments/environment';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from '@angular/common';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { BusinessCreationComponent } from './views/business-creation/business-creation.component';
import { BusinessComponent } from './views/business/business.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { BusinessDetailComponent } from './views/business-detail/business-detail.component';
import { BusinessEditionComponent } from './views/business-edition/business-edition.component';
import { BusinessListComponent } from './views/business-list/business-list.component';
import { CatalogComponent } from './views/catalog/catalog.component';
import { BusinessIsolationComponent } from './views/business-isolation/business-isolation.component';
import { CatalogSummaryComponent } from './views/catalog-summary/catalog-summary.component';
import { CatalogCategoriesComponent } from './views/catalog-categories/catalog-categories.component';
import { CatalogProductsComponent } from './views/catalog-products/catalog-products.component';
import { CategoryListComponent } from './views/category-list/category-list.component';
import { CategoryEditionComponent } from './views/category-edition/category-edition.component';
import { CategoryCreationComponent } from './views/category-creation/category-creation.component';
import { ProductEditionComponent } from './views/product-edition/product-edition.component';
import { ProductListComponent } from './views/product-list/product-list.component';
import { ProductCreationComponent } from './views/product-creation/product-creation.component';
import { AccountIsolationComponent } from './views/account-isolation/account-isolation.component';
import { AccountEditionComponent } from './views/account-edition/account-edition.component';
import { BusinessQrComponent } from './views/business-qr/business-qr.component';

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
    BusinessQrComponent
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
    NgxQRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
