import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockService } from 'ng-mocks';
import { BusinessService } from 'src/app/api/business.service';
import { CatalogService } from 'src/app/api/catalog.service';
import { MetadataService } from 'src/app/api/metadata.service';
import { CategoryFormComponent } from '../../components/category-form/category-form.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ToastService } from '../../toast.service';
import { CategoryCreationComponent } from './category-creation.component';

describe('CategoryCreationComponent', () => {
  let component: CategoryCreationComponent;
  let fixture: ComponentFixture<CategoryCreationComponent>;

  const catalogServiceMock = MockService(CatalogService);
  const metaServiceMock = MockService(MetadataService);
  const businessServiceMock = MockService(BusinessService);
  const toastServiceMock = MockService(ToastService);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CategoryCreationComponent,
        MockComponent(LoaderComponent),
        MockComponent(CategoryFormComponent),
      ],
      imports: [RouterTestingModule],
      providers: [
        { provide: CatalogService, useValue: catalogServiceMock },
        { provide: MetadataService, useValue: metaServiceMock },
        { provide: BusinessService, useValue: businessServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
