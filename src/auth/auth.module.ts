import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../app/components/components.module';
import { AdminGuard } from './admin.guard';
import { AuthConfig } from './auth';
import { AuthConfigService } from './auth-config.service';
import { AuthGuard } from './auth.guard';
import { AuthHttpInterceptorService } from './auth.http.interceptor';
import { AuthPasswordResetComponent } from './auth.password-reset.component';
import { AuthRoutes } from './auth.routes';
import { AuthService } from './auth.service';
import { AuthSigninComponent } from './auth.signin.component';
import { AuthSignupComponent } from './auth.signup.component';
import { CallbackComponent } from './callback.component';
import { NotAuthGuard } from './not-auth.guard';

const routes: Routes = [
  {
    path: AuthRoutes.CALLBACK,
    component: CallbackComponent,
  },
  {
    path: AuthRoutes.SIGNIN,
    component: AuthSigninComponent,
    canActivate: [
      NotAuthGuard,
    ],
  },
  {
    path: AuthRoutes.PASSWORD_RESET,
    component: AuthPasswordResetComponent,
    canActivate: [
      NotAuthGuard,
    ],
  },
  {
    path: AuthRoutes.SIGNUP,
    component: AuthSignupComponent,
    canActivate: [
      NotAuthGuard,
    ],
  },
];

@NgModule({
  providers: [AuthService, AuthGuard, NotAuthGuard, AdminGuard],
  declarations: [CallbackComponent, AuthSigninComponent, AuthSignupComponent, AuthPasswordResetComponent],
  imports: [CommonModule, ReactiveFormsModule, ComponentsModule, RouterModule.forRoot(routes), PlatformModule, TranslateModule],
})
export class AuthModule {
  static forRoot(config: AuthConfig): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        { provide: AuthConfigService, useFactory: generateAutoConfigFactory(config) },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthHttpInterceptorService,
          multi: true,
        },
      ],
    };
  }
}

// tslint:disable-next-line:ban-types
function generateAutoConfigFactory(config: AuthConfig): Function {
  return () => ({
    clientID: config.clientID,
    domain: config.domain,
    redirectUri: config.redirectUri,
    returnTo: config.returnTo,
    scope: config.scope || 'openid profile email',
    audience: config.audience || `https://${config.domain}/userinfo`,
    responseType: config.responseType || 'token id_token',
  } as AuthConfig);
}
