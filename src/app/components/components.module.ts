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
import { UploadExcelComponent } from './upload-excel/upload-excel.component';
import { SetAddressComponent } from './set-address/set-address.component';

@NgModule({
  exports: [
    LoaderComponent,
    BusinessFormComponent,
    CategoryFormComponent,
    ProductFormComponent,
    AccountFormComponent,
    SidebarComponent,
    UploadExcelComponent],
  declarations: [
    LoaderComponent,
    BusinessFormComponent,
    CategoryFormComponent,
    ProductFormComponent,
    AccountFormComponent,
    SidebarComponent,
    FilterLanguagesPipe,
    UploadExcelComponent,
    SetAddressComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class ComponentsModule { }
