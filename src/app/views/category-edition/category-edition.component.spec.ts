import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockService } from 'ng-mocks';
import { BusinessService } from 'src/app/api/business.service';
import { CatalogService } from 'src/app/api/catalog.service';
import { CategoryFormComponent } from 'src/app/components/category-form/category-form.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { MetadataService } from '../../api/metadata.service';
import { CategoryEditionComponent } from './category-edition.component';

describe('CategoryEditionComponent', () => {
  let component: CategoryEditionComponent;
  let fixture: ComponentFixture<CategoryEditionComponent>;

  const catalogServiceMock = MockService(CatalogService);
  const metaServiceMock = MockService(MetadataService);
  const businessServiceMock = MockService(BusinessService);
  const metadataServiceMock = MockService(MetadataService);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CategoryEditionComponent,
        MockComponent(LoaderComponent),
        MockComponent(CategoryFormComponent),
      ],
      imports: [RouterTestingModule],
      providers: [
        { provide: CatalogService, useValue: catalogServiceMock },
        { provide: MetadataService, useValue: metaServiceMock },
        { provide: BusinessService, useValue: businessServiceMock },
        { provide: MetadataService, useValue: metadataServiceMock },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
