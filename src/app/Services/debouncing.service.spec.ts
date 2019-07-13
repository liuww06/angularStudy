import { TestBed } from '@angular/core/testing';

import { DebouncingService } from './debouncing.service';

describe('DebouncingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DebouncingService = TestBed.get(DebouncingService);
    expect(service).toBeTruthy();
  });
});
