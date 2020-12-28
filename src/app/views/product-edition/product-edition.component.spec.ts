import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockService } from 'ng-mocks';
import { BusinessService } from 'src/app/api/business.service';
import { CatalogService } from 'src/app/api/catalog.service';
import { MetadataService } from 'src/app/api/metadata.service';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { ProductFormComponent } from 'src/app/components/product-form/product-form.component';
import { ProductEditionComponent } from './product-edition.component';

describe('ProductEditionComponent', () => {
  let component: ProductEditionComponent;
  let fixture: ComponentFixture<ProductEditionComponent>;

  const catalogServiceMock = MockService(CatalogService);
  const metaServiceMock = MockService(MetadataService);
  const businessServiceMock = MockService(BusinessService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductEditionComponent,
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
    fixture = TestBed.createComponent(ProductEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
