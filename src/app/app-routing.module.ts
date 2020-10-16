import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddBusinessComponent } from './views/add-business/add-business.component';
import { BusinessDetailComponent } from './views/business-detail/business-detail.component';
import { BusinessComponent } from './views/business/business.component';
import { MainComponent } from './views/main/main.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { ProfileComponent } from './views/profile/profile.component';


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
      },
      {
        path: ':id',
        component: BusinessDetailComponent
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
