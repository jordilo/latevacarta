import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsAPILoader } from '@agm/core';
import { MockService } from 'ng-mocks';
import { SetAddressComponent } from './set-address.component';

describe('SetAddressComponent', () => {
  let component: SetAddressComponent;
  let fixture: ComponentFixture<SetAddressComponent>;
  const mapsApiMock = MockService(MapsAPILoader, {
    load: jest.fn(),
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SetAddressComponent],
      providers: [{ provide: MapsAPILoader, useFactory: () => mapsApiMock }],
    })
      .compileComponents();
    jest.spyOn(mapsApiMock, 'load').mockReturnValue(Promise.resolve());
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
