import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockService } from 'ng-mocks';

import { UtilsService } from '../../api/utils.service';
import { UploadExcelComponent } from './upload-excel.component';

describe('UploadExcelComponent', () => {
  let component: UploadExcelComponent;
  let fixture: ComponentFixture<UploadExcelComponent>;

  const utilsMock = MockService(UtilsService);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadExcelComponent],
      providers: [{ provide: UtilsService, value: utilsMock }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
