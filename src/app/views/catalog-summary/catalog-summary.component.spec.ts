import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockService } from 'ng-mocks';
import { CatalogService } from '../../api/catalog.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { UploadExcelComponent } from '../../components/upload-excel/upload-excel.component';
import { CatalogSummaryComponent } from './catalog-summary.component';

describe('CatalogSummaryComponent', () => {
  let component: CatalogSummaryComponent;
  let fixture: ComponentFixture<CatalogSummaryComponent>;

  const catalogServiceMock = MockService(CatalogService);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CatalogSummaryComponent,
        MockComponent(LoaderComponent),
        MockComponent(UploadExcelComponent),
      ],
      imports: [RouterTestingModule],
      providers: [{ provide: CatalogService, useValue: catalogServiceMock }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
