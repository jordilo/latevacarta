import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY, throwError } from 'rxjs';
import { environment } from './../environments/environment.prod';
import { AuthConfigService } from './auth-config.service';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { AuthServiceMock } from './auth.service.mock';
import { AuthSigninComponent } from './auth.signin.component';

describe('Given a auth signin component', () => {

  let component: AuthSigninComponent;
  let fixture: ComponentFixture<AuthSigninComponent>;
  let element: HTMLElement;

  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useClass: AuthServiceMock }, AuthConfigService],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        AuthModule.forRoot(environment.auth),
        RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSigninComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    authService = fixture.debugElement.injector.get(AuthService);
    fixture.detectChanges();
  });

  it('Should be creater properly', () => {
    expect(component).toBeDefined();
    expect(element).toBeDefined();
  });

  it('when click on a valid form then login is called with correct parameters', () => {
    const loginSpy = spyOn(authService, 'login').and.returnValue(EMPTY);
    component.loginForm.setValue({ username: 'user-name', password: 'user-pwd' });
    fixture.detectChanges();
    (element.querySelector('#login-button') as HTMLButtonElement).click();
    expect(loginSpy).toHaveBeenCalled();
    expect(loginSpy).toHaveBeenCalledWith('user-name', 'user-pwd');
  });
  it('when click on a valid form and login throw an error then error is displayed', () => {
    spyOn(authService, 'login').and.returnValue(throwError({ description: 'this is an error' }));
    component.loginForm.setValue({ username: 'user-name', password: 'user-pwd' });
    fixture.detectChanges();
    (element.querySelector('#login-button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(component.error).toEqual('this is an error');
  });
});
