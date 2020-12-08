import {TestBed} from '@angular/core/testing';

import {MockHttpMembershipService} from './mock-http-membership.service';

describe('MockHttpMembershipServiceService', () => {
  let service: MockHttpMembershipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockHttpMembershipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
