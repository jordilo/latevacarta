import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockService } from 'ng-mocks';
import { BusinessService } from '../../api/business.service';
import { CatalogComponent } from './catalog.component';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  const businessServiceMock = MockService(BusinessService);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: BusinessService, useValue: businessServiceMock }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
