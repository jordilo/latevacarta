import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessEditionComponent } from './business-edition.component';

describe('BusinessEditionComponent', () => {
  let component: BusinessEditionComponent;
  let fixture: ComponentFixture<BusinessEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessEditionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
