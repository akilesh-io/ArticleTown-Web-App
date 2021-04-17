import { TestBed } from '@angular/core/testing';

import { UserArticlesService } from './user-articles.service';

describe('UserArticlesService', () => {
  let service: UserArticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserArticlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
