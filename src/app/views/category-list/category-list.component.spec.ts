import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockService } from 'ng-mocks';
import { CatalogService } from 'src/app/api/catalog.service';
import { CategoryFormComponent } from 'src/app/components/category-form/category-form.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { UploadExcelComponent } from '../../components/upload-excel/upload-excel.component';
import { CategoryListComponent } from './category-list.component';

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;

  const catalogServiceMock = MockService(CatalogService);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CategoryListComponent,
        MockComponent(LoaderComponent),
        MockComponent(CategoryFormComponent),
        MockComponent(UploadExcelComponent),
      ],
      imports: [RouterTestingModule],
      providers: [
        { provide: CatalogService, useValue: catalogServiceMock },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
