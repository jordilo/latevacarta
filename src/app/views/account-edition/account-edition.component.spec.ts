import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockService } from 'ng-mocks';
import { of } from 'rxjs';
import { IAccount } from '../../api/account';
import { AccountService } from '../../api/account.service';
import { AccountFormComponent } from '../../components/account-form/account-form.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ToastService } from '../../toast.service';
import { AccountEditionComponent } from './account-edition.component';

describe('AccountEditionComponent', () => {
  let component: AccountEditionComponent;
  let fixture: ComponentFixture<AccountEditionComponent>;

  const accountServiceMock = MockService(AccountService);
  const toastServiceMock = MockService(ToastService);

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        AccountEditionComponent,
        MockComponent(LoaderComponent),
        MockComponent(AccountFormComponent),
      ],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: AccountService, useValue: accountServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
      ],
    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountEditionComponent);
    component = fixture.componentInstance;

    const service = fixture.debugElement.injector.get(AccountService);
    jest.spyOn(service, 'getAccount')
      .mockReturnValue(of<IAccount>({ id: '1', name: 'test', lastname: 'test' } as IAccount));
    fixture.detectChanges();
  });
  test.only('should create', () => {
    expect(component).toBeTruthy();
  });
});
