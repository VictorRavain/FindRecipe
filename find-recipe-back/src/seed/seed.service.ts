import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { Categorie } from 'src/categories/categorie.entity';
import { Ingredient } from 'src/ingredients/ingredient.entity';
import { Recette } from 'src/recettes/recette.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Categorie)
    private categorieRepository: Repository<Categorie>,
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
    @InjectRepository(Recette)
    private recetteRepository: Repository<Recette>,
  ) {}

  async loadJsonData() {
    const data = JSON.parse(
      fs.readFileSync('src/data/find_recipes_data.json', 'utf-8') // Path to your JSON file
    );

    // Insert categories
    const categories = await this.categorieRepository.save(data.categories);

    // Insert ingredients
    const ingredients = await this.ingredientRepository.save(data.ingredients);

    // Insert recipes
    for (const recipe of data.recettes) {
      const category = categories.find((cat) => cat.id === recipe.categorie.id);

      // Map ingredients for the recipe
      const recipeIngredients = recipe.ingredients.map((ingredient) => {
        const matchedIngredient = ingredients.find((ing) => ing.id === ingredient.id);
        return { ...matchedIngredient, quantite: ingredient.quantite, unite: ingredient.unite };
      });

      const recette = this.recetteRepository.create({
        ...recipe,
        categorie: category,
        ingredients: recipeIngredients,
      });

      await this.recetteRepository.save(recette);
    }

    console.log('Data has been successfully loaded into the database.');
  }
}
