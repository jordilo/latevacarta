import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { BusinessFormComponent } from './business-form/business-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryFormComponent } from './category-form/category-form.component';



@NgModule({
  exports: [LoaderComponent, BusinessFormComponent, CategoryFormComponent],
  declarations: [LoaderComponent, BusinessFormComponent, CategoryFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
