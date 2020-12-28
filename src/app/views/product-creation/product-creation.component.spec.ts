import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockService } from 'ng-mocks';
import { BusinessService } from 'src/app/api/business.service';
import { CatalogService } from 'src/app/api/catalog.service';
import { MetadataService } from 'src/app/api/metadata.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { ProductCreationComponent } from './product-creation.component';

describe('ProductCreationComponent', () => {
  let component: ProductCreationComponent;
  let fixture: ComponentFixture<ProductCreationComponent>;

  const catalogServiceMock = MockService(CatalogService);
  const metaServiceMock = MockService(MetadataService);
  const businessServiceMock = MockService(BusinessService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductCreationComponent,
        MockComponent(LoaderComponent),
        MockComponent(ProductFormComponent),
      ],
      imports: [RouterTestingModule],
      providers: [
        { provide: CatalogService, useValue: catalogServiceMock },
        { provide: MetadataService, useValue: metaServiceMock },
        { provide: BusinessService, useValue: businessServiceMock },
      ],

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
