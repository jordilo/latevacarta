import { TestBed } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';
import { MockService } from 'ng-mocks';
import { AddressService } from './address.service';

describe('AddressServiceService', () => {
  let service: AddressService;

  const apolloMock = MockService(Apollo);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Apollo, value: apolloMock }],
    });
    service = TestBed.inject(AddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
