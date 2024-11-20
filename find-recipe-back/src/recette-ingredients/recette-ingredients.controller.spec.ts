import { Test, TestingModule } from '@nestjs/testing';
import { RecetteIngredientsController } from './recette-ingredients.controller';

describe('RecetteIngredientsController', () => {
  let controller: RecetteIngredientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecetteIngredientsController],
    }).compile();

    controller = module.get<RecetteIngredientsController>(RecetteIngredientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
