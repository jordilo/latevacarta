import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent, MockService } from 'ng-mocks';
import { AccountService } from '../../api/account.service';

import { BrandImageComponent } from '../../components/brand-image/brand-image.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { AccountListComponent } from './account-list.component';

describe('AccountListComponent', () => {
  let component: AccountListComponent;
  let fixture: ComponentFixture<AccountListComponent>;

  const accountServiceMock = MockService(AccountService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AccountListComponent,
        MockComponent(BrandImageComponent),
        MockComponent(LoaderComponent),
      ],
      providers: [{ provide: AccountService, useValue: accountServiceMock }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
