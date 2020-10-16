import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { AuthModule } from '../auth/auth.module';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { environment } from '../environments/environment';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from '@angular/common';
import { AddBusinessComponent } from './add-business/add-business.component';
import { BusinessComponent } from './business/business.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    MainComponent,
    AddBusinessComponent,
    BusinessComponent,
    NotFoundComponent
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
