import { TestBed, inject } from '@angular/core/testing';

import { PoliticalService } from './political.service';

describe('PoliticalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PoliticalService]
    });
  });

  it('should be created', inject([PoliticalService], (service: PoliticalService) => {
    expect(service).toBeTruthy();
  }));
});
