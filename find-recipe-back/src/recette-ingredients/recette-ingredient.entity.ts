import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Recette } from '../recettes/recette.entity';
import { Ingredient } from '../ingredients/ingredient.entity';

@Entity()
export class RecetteIngredient {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Recette, (recette) => recette.ingredients)
  recette: Recette;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recettes)
  ingredient: Ingredient;

  @Column('float')
  quantité: number;

  @Column()
  unité: string;
}