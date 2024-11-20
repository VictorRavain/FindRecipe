import { Test, TestingModule } from '@nestjs/testing';
import { RecetteIngredientsService } from './recette-ingredients.service';

describe('RecetteIngredientsService', () => {
  let service: RecetteIngredientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecetteIngredientsService],
    }).compile();

    service = module.get<RecetteIngredientsService>(RecetteIngredientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
