import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categorie } from './categories/categorie.entity';
import { Recette } from './recettes/recette.entity';
import { Ingredient } from './ingredients/ingredient.entity';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,     
    @InjectRepository(Categorie)  private categorieRepository: Repository<Categorie>,
    @InjectRepository(Recette)  private RecetteRepository: Repository<Recette>,
    @InjectRepository(Ingredient)  private IngredientRepository: Repository<Ingredient>,
  ) {}

  @Get('/categories') // Define an endpoint to fetch categories
  async getCategories() {
    return this.categorieRepository.find(); // Query all categories from the database
  }

  @Get('/recette') // Define an endpoint to fetch categories
  async getRecette() {
    return this.RecetteRepository.find(); // Query all categories from the database
  }

  @Get('/ingredient') // Define an endpoint to fetch categories
  async getIngredient() {
    return this.IngredientRepository.find(); // Query all categories from the database
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
