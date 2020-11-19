import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetAddressComponent } from './set-address.component';

describe('SetAddressComponent', () => {
  let component: SetAddressComponent;
  let fixture: ComponentFixture<SetAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
