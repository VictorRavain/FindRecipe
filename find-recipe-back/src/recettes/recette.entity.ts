import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Categorie } from '../categories/categorie.entity';
import { RecetteIngredient } from '../recette-ingredients/recette-ingredient.entity';

@Entity()
export class Recette {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column('text')
  description: string;

  @Column('text')
  instructions: string;

  @Column()
  temps_preparation: number;

  @Column()
  temps_cuisson: number;

  @ManyToOne(() => Categorie, (categorie) => categorie.recettes)
  categorie: Categorie;

  @OneToMany(() => RecetteIngredient, (recetteIngredient) => recetteIngredient.recette)
  ingredients: RecetteIngredient[];
}