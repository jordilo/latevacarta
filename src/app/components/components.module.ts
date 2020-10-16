import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { BusinessFormComponent } from './business-form/business-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  exports: [LoaderComponent, BusinessFormComponent],
  declarations: [LoaderComponent, BusinessFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
