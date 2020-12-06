import { TestBed } from '@angular/core/testing';

import { HttpGroupServiceService } from './http-group-service.service';

describe('HttpGroupServiceService', () => {
  let service: HttpGroupServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpGroupServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
