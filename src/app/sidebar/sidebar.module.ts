import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from './../components/components.module';
import { SidebarComponent } from './sidebar.component';

@NgModule({
    imports: [RouterModule, CommonModule, ComponentsModule],
    declarations: [SidebarComponent],
    exports: [SidebarComponent],
})

export class SidebarModule { }
