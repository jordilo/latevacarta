import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MockService } from 'ng-mocks';
import { BACKEND_URL } from '../backend-url';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;
  const httpclientMock = MockService(HttpClient);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, value: httpclientMock },
        { provide: BACKEND_URL, value: 'http://none.com' },
      ],
    });
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
