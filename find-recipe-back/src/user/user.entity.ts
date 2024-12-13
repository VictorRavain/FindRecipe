import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Ingredient } from 'src/ingredients/ingredient.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.user)
  ingredients: Ingredient[];
}
