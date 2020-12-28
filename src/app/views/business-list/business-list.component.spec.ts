import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockService } from 'ng-mocks';
import { BusinessService } from '../../api/business.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { BusinessListComponent } from './business-list.component';

describe('BusinessListComponent', () => {
  let component: BusinessListComponent;
  let fixture: ComponentFixture<BusinessListComponent>;

  const businessServiceMock = MockService(BusinessService);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessListComponent, LoaderComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: BusinessService, useValue: businessServiceMock }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
