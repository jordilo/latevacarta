import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  exports: [LoaderComponent],
  declarations: [LoaderComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
