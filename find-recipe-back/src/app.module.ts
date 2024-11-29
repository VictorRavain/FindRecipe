import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recette } from './recettes/recette.entity';
import { Ingredient } from './ingredients/ingredient.entity';
import { Categorie } from './categories/categorie.entity';
import { RecetteModule } from './recettes/recettes.module';
import { IngredientsModule } from './ingredients/ingredients.module';
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
      entities: [Recette, Ingredient, Categorie, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Recette, Ingredient, Categorie]),
    RecetteModule,
    IngredientsModule,
    CategoriesModule,
    UsersModule,
    AuthModule,
  ],
  providers: [SeedService, AppService],
  controllers: [AppController], // Ensure AppController is listed here
})
export class AppModule {}