import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Recette } from '../recettes/recette.entity';

@Entity()
export class Categorie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Recette, (recette) => recette.categorie)
  recettes: Recette[];
}