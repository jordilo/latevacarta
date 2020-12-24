import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockService } from 'ng-mocks';
import { AccountService } from '../../api/account.service';
import { BusinessService } from '../../api/business.service';
import { MetadataService } from '../../api/metadata.service';
import { BusinessFormComponent } from '../../components/business-form/business-form.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { BusinessCreationComponent } from './business-creation.component';

describe('AddBusinessComponent', () => {
  let component: BusinessCreationComponent;
  let fixture: ComponentFixture<BusinessCreationComponent>;

  const businessServiceMock = MockService(BusinessService);
  const metadataServiceMock = MockService(MetadataService);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BusinessCreationComponent,
        MockComponent(LoaderComponent),
        MockComponent(BusinessFormComponent),
      ],
      providers: [
        { provide: AccountService, useValue: businessServiceMock },
        { provide: MetadataService, useValue: metadataServiceMock },
      ],
      imports: [RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
