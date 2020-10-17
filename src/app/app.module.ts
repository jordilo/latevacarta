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
import { AddBusinessComponent } from './views/add-business/add-business.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    MainComponent,
    AddBusinessComponent,
    BusinessComponent,
    NotFoundComponent,
    BusinessDetailComponent,
    BusinessEditionComponent,
    BusinessListComponent,
    CatalogComponent,
    BusinessIsolationComponent,
    CatalogSummaryComponent,
    CatalogCategoriesComponent,
    CatalogProductsComponent
  ],
  imports: [
    AuthModule.forRoot(environment.auth),
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
