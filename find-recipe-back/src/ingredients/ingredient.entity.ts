import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from 'typeorm';
import { Recette } from 'src/recettes/recette.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column('float')
  quantite: number;

  @Column()
  unite: string;

  @Column()
  image: string;

  @ManyToMany(() => Recette, (recette) => recette.ingredients)
  recettes: Recette[];

  @ManyToOne(() => User, (user) => user.ingredients, { onDelete: 'CASCADE' })
  user: User;
}