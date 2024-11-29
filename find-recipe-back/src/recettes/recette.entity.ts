import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Categorie } from '../categories/categorie.entity';
import { Ingredient } from 'src/ingredients/ingredient.entity';

@Entity()
export class Recette {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('text')
  instructions: string;

  @Column()
  temps_preparation: number;

  @Column()
  temps_cuisson: number;

  @ManyToOne(() => Categorie, (categorie) => categorie.recettes, { eager: true })
  categorie: Categorie;

  @ManyToMany(() => Ingredient, { cascade: true, eager: true })
  @JoinTable()
  ingredients: Ingredient[];
}