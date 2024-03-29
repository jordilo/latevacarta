import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccountFormComponent } from './account-form/account-form.component';
import { BrandImageComponent } from './brand-image/brand-image.component';
import { BusinessFormComponent } from './business-form/business-form.component';
import { FilterLanguagesPipe } from './business-form/filter-languages.pipe';
import { CategoryFormComponent } from './category-form/category-form.component';
import { LoaderComponent } from './loader/loader.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { SetAddressComponent } from './set-address/set-address.component';
import { UploadExcelComponent } from './upload-excel/upload-excel.component';

@NgModule({
  exports: [
    LoaderComponent,
    BusinessFormComponent,
    CategoryFormComponent,
    ProductFormComponent,
    AccountFormComponent,
    UploadExcelComponent,
    BrandImageComponent],
  declarations: [
    LoaderComponent,
    BusinessFormComponent,
    CategoryFormComponent,
    ProductFormComponent,
    AccountFormComponent,
    FilterLanguagesPipe,
    UploadExcelComponent,
    SetAddressComponent,
    BrandImageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
  ],
})
export class ComponentsModule { }
