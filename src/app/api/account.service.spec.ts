import { TestBed } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';
import { MockService } from 'ng-mocks';

import { AuthService } from '../../auth/auth.service';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;

  const apolloMock = MockService(Apollo);
  const authMock = MockService(AuthService);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Apollo, value: apolloMock },
        { provide: AuthService, value: authMock },
      ],
    });
    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
