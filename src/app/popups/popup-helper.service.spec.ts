import { TestBed } from '@angular/core/testing';

import { PopupHelperService } from './popup-helper.service';

describe('PopuphelperService', () => {
  let service: PopupHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
