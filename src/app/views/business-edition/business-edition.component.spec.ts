import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockService } from 'ng-mocks';
import { AddressService } from 'src/app/api/address.service';
import { BusinessService } from 'src/app/api/business.service';
import { MetadataService } from 'src/app/api/metadata.service';
import { ToastService } from 'src/app/toast.service';
import { BusinessFormComponent } from '../../components/business-form/business-form.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { BusinessEditionComponent } from './business-edition.component';

describe('BusinessEditionComponent', () => {
  let component: BusinessEditionComponent;
  let fixture: ComponentFixture<BusinessEditionComponent>;

  const businessServiceMock = MockService(BusinessService);
  const addressServiceMock = MockService(AddressService);
  const metadataMock = MockService(MetadataService);
  const toastMock = MockService(ToastService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BusinessEditionComponent,
        MockComponent(LoaderComponent),
        MockComponent(BusinessFormComponent),
      ],
      providers: [
        { provide: BusinessService, useValue: businessServiceMock },
        { provide: AddressService, useValue: addressServiceMock },
        { provide: MetadataService, useValue: metadataMock },
        { provide: ToastService, useValue: toastMock },
      ],
      imports: [RouterTestingModule],
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
