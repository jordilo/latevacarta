import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddBusinessComponent } from './add-business/add-business.component';
import { BusinessComponent } from './business/business.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'business',
    component: BusinessComponent,
    canActivate: [
      AuthGuard
    ],
    children: [
      {
        path: 'add',
        component: AddBusinessComponent
      }
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
