import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Recette } from 'src/recettes/recette.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column('float')
  quantité: number;

  @Column()
  unité: string;

  @ManyToMany(() => Recette, (recette) => recette.ingredients)
  recettes: Recette[];
}