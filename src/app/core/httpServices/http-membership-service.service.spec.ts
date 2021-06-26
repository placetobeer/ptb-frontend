import { TestBed } from '@angular/core/testing';

import { HttpMembershipService } from './http-membership.service';

describe('HttpUserServiceService', () => {
  let service: HttpMembershipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpMembershipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
