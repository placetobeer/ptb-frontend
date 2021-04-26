import { TestBed } from '@angular/core/testing';

import { HttpInvitationService } from './http-invitation.service';

describe('HttpInvitationService', () => {
  let service: HttpInvitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpInvitationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
