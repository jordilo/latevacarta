import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountFormComponent } from './account-form/account-form.component';
import { BusinessFormComponent } from './business-form/business-form.component';
import { FilterLanguagesPipe } from './business-form/filter-languages.pipe';
import { CategoryFormComponent } from './category-form/category-form.component';
import { LoaderComponent } from './loader/loader.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  exports: [
    LoaderComponent,
    BusinessFormComponent,
    CategoryFormComponent,
    ProductFormComponent,
    AccountFormComponent,
    SidebarComponent],
  declarations: [
    LoaderComponent,
    BusinessFormComponent,
    CategoryFormComponent,
    ProductFormComponent,
    AccountFormComponent,
    SidebarComponent,
    FilterLanguagesPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class ComponentsModule { }
