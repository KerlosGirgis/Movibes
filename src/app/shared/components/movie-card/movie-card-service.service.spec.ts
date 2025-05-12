import { TestBed } from '@angular/core/testing';

import { MovieCardServiceService } from './movie-card-service.service';

describe('MovieCardServiceService', () => {
  let service: MovieCardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieCardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
