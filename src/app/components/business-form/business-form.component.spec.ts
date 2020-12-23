import { MapsAPILoader } from '@agm/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockService } from 'ng-mocks';
import { IBusiness } from 'src/app/api/business';
import { UploadFileService } from 'src/app/api/upload-file.service';
import { SetAddressComponent } from '../set-address/set-address.component';
import { BusinessFormComponent } from './business-form.component';
import { FilterLanguagesPipe } from './filter-languages.pipe';

describe('BusinessFormComponent', () => {
  let component: BusinessFormComponent;
  let fixture: ComponentFixture<BusinessFormComponent>;

  const uploadFileMock = MockService(UploadFileService);
  const mapsApiMock = MockService(MapsAPILoader, {
    load: jest.fn(),
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessFormComponent, FilterLanguagesPipe, SetAddressComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: UploadFileService, value: uploadFileMock },
        { provide: MapsAPILoader, useFactory: () => mapsApiMock }],
    })
      .compileComponents();
    jest.spyOn(mapsApiMock, 'load').mockReturnValue(Promise.resolve());
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessFormComponent);
    component = fixture.componentInstance;
    component.business = { id: '1', address: { id: '2' } } as IBusiness;
    component.languages = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
