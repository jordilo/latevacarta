import { Platform } from '@angular/cdk/platform';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NEVER } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthMobile } from './auth.mobile';
import { AuthRoutes } from './auth.routes';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './auth.signin.component.html',
})
export class AuthSigninComponent extends AuthMobile implements OnInit {

  public loginForm: FormGroup;
  public error: string;
  public readonly passwordResetPath = '/' + AuthRoutes.PASSWORD_RESET;
  public readonly signupPath = '/' + AuthRoutes.SIGNUP;
  public get isEmailEmpty(): boolean {
    const emailCtrl = this.loginForm.get('username');
    return emailCtrl.errors !== null && emailCtrl.errors.required !== undefined && emailCtrl.dirty;
  }

  public get isPasswordEmpty(): boolean {
    const emailCtrl = this.loginForm.get('password');
    return emailCtrl.errors !== null && emailCtrl.errors.required !== undefined && emailCtrl.dirty;
  }
  constructor(private fb: FormBuilder, private auth: AuthService, platform: Platform) {
    super(platform, auth);
  }

  public ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public sendForm() {
    this.error = undefined;
    const { username, password } = this.loginForm.value;
    this.loginForm.disable();
    this.auth.login(username, password)
      .pipe(catchError((error) => {
        this.error = error.description;
        this.loginForm.enable();
        return NEVER;
      }))
      .subscribe();
  }
}
