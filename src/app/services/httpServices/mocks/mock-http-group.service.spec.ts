import {TestBed} from '@angular/core/testing';

import {MockHttpGroupService} from './mock-http-group.service';

describe('MockHttpGroupServiceService', () => {
  let service: MockHttpGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockHttpGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
