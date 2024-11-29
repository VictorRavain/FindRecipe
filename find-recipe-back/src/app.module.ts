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
import { SeedService } from './seed/seed.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/users.module';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'azerty',
      database: 'findrecipes',
      entities: [Recette, Ingredient, RecetteIngredient, Categorie, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Recette, Ingredient, RecetteIngredient, Categorie]),
    RecetteModule,
    IngredientsModule,
    RecetteIngredientsModule,
    CategoriesModule,
    UsersModule,
    AuthModule,
  ],
  providers: [SeedService, AppService],
  controllers: [AppController], // Ensure AppController is listed here
})
export class AppModule {}