import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessIsolationComponent } from './business-isolation.component';

describe('BusinessIsolationComponent', () => {
  let component: BusinessIsolationComponent;
  let fixture: ComponentFixture<BusinessIsolationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessIsolationComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessIsolationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
