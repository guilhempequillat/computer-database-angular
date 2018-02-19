import { TestBed, inject } from '@angular/core/testing';

import { ComputerService } from './service/app.service';

describe('ComputerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComputerService]
    });
  });

  it('should be created', inject([ComputerService], (service: ComputerService) => {
    expect(service).toBeTruthy();
  }));
});
