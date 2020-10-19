import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { BusinessFormComponent } from './business-form/business-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { AccountFormComponent } from './account-form/account-form.component';



@NgModule({
  exports: [LoaderComponent, BusinessFormComponent, CategoryFormComponent, ProductFormComponent, AccountFormComponent],
  declarations: [LoaderComponent, BusinessFormComponent, CategoryFormComponent, ProductFormComponent, AccountFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
