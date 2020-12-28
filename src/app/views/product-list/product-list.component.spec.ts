import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockService } from 'ng-mocks';
import { CatalogService } from '../../api/catalog.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { UploadExcelComponent } from '../../components/upload-excel/upload-excel.component';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  const catalogServiceMock = MockService(CatalogService);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductListComponent,
        MockComponent(LoaderComponent),
        MockComponent(UploadExcelComponent),
      ],
      imports: [RouterTestingModule],
      providers: [{ provide: CatalogService, useValue: catalogServiceMock }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
