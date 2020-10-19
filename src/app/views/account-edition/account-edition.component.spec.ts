import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountEditionComponent } from './account-edition.component';

describe('AccountEditionComponent', () => {
  let component: AccountEditionComponent;
  let fixture: ComponentFixture<AccountEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
