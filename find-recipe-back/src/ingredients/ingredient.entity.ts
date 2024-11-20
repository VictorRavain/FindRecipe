import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RecetteIngredient } from '../recette-ingredients/recette-ingredient.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  type: string;

  @OneToMany(() => RecetteIngredient, (recetteIngredient) => recetteIngredient.ingredient)
  recettes: RecetteIngredient[];
}