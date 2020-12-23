import { TestBed } from '@angular/core/testing';
import { MockService } from 'ng-mocks';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;
  const toastrMock = MockService(ToastrService);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ToastrService, value: toastrMock }],
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
