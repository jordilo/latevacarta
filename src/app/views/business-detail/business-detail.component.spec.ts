import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockModule, MockService } from 'ng-mocks';
import { ChartsModule } from 'ng2-charts';
import { AnalyticsService } from '../../api/analytics.service';
import { BusinessService } from '../../api/business.service';
import { BrandImageComponent } from '../../components/brand-image/brand-image.component';
import { BusinessDetailComponent } from './business-detail.component';

describe('BusinessDetailComponent', () => {
  let component: BusinessDetailComponent;
  let fixture: ComponentFixture<BusinessDetailComponent>;
  const activatedRouteMock = MockService(ActivatedRoute);
  const businessServiceMock = MockService(BusinessService);
  const analyticsServiceMock = MockService(AnalyticsService);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BusinessDetailComponent,
        MockComponent(BrandImageComponent),
      ],
      providers: [
        { provide: BusinessService, useValue: businessServiceMock },
        { provide: AnalyticsService, useValue: analyticsServiceMock },
      ],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
