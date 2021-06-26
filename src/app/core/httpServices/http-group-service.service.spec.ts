import { TestBed } from '@angular/core/testing';

import { HttpGroupService } from './http-group.service';

describe('HttpGroupServiceService', () => {
  let service: HttpGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
