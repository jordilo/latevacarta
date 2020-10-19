import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountIsolationComponent } from './account-isolation.component';

describe('AccountIsolationComponent', () => {
  let component: AccountIsolationComponent;
  let fixture: ComponentFixture<AccountIsolationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountIsolationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountIsolationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
