import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recette } from './recettes/recette.entity';
import { Ingredient } from './ingredients/ingredient.entity';
import { RecetteIngredient } from './recette-ingredients/recette-ingredient.entity';
import { Categorie } from './categories/categorie.entity';
import { RecetteModule } from './recettes/recettes.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { RecetteIngredientsModule } from './recette-ingredients/recette-ingredients.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'votre_username',
      password: 'votre_password',
      database: 'findrecipes',
      entities: [Recette, Ingredient, RecetteIngredient, Categorie],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Recette, Ingredient, RecetteIngredient, Categorie]),
    RecetteModule,
    IngredientsModule,
    RecetteIngredientsModule,
    CategoriesModule,
  ],
})
export class AppModule {}