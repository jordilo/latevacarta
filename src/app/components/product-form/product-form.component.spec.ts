import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockService } from 'ng-mocks';
import { UploadFileService } from '../../api/upload-file.service';
import { ProductFormComponent } from './product-form.component';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  const uploadFileMock = MockService(UploadFileService);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      providers: [{ provide: UploadFileService, value: uploadFileMock }],
      imports: [ReactiveFormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    component.businessLanguages = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
