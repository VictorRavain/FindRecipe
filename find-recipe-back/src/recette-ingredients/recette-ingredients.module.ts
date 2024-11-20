import { Module } from '@nestjs/common';
import { RecetteIngredientsService } from './recette-ingredients.service';
import { RecetteIngredientsController } from './recette-ingredients.controller';

@Module({
  providers: [RecetteIngredientsService],
  controllers: [RecetteIngredientsController]
})
export class RecetteIngredientsModule {}
