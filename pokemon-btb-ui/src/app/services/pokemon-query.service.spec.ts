import { TestBed } from '@angular/core/testing';

import { PokemonQueryService } from './pokemon-query.service';

describe('PokemonQueryService', () => {
  let service: PokemonQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
