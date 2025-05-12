import { TestBed } from '@angular/core/testing';

import { ApiDetailsServiceService } from './api-details-service.service';

describe('ApiDetailsServiceService', () => {
  let service: ApiDetailsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDetailsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
