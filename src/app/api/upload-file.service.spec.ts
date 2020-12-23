import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';
import { MockService } from 'ng-mocks';
import { BACKEND_URL } from '../backend-url';

import { UploadFileService } from './upload-file.service';

describe('UploadFileService', () => {
  let service: UploadFileService;

  const httpclientMock = MockService(HttpClient);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, value: httpclientMock },
        { provide: BACKEND_URL, value: 'http://none.com' },
      ],
    });
    service = TestBed.inject(UploadFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
