import { TestBed } from '@angular/core/testing';

import { GoogleanalyticsserviceService } from './googleanalyticsservice.service';

describe('GoogleanalyticsserviceService', () => {
  let service: GoogleanalyticsserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleanalyticsserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
