import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientsRepository: Repository<Ingredient>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findAllByUser(userId: number): Promise<Ingredient[]> {
    return this.ingredientsRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(id: number): Promise<Ingredient> {
    return this.ingredientsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.ingredientsRepository.delete(id);
    return result.affected > 0; // Returns true if at least one row was deleted
  }

  async create(userId: number, ingredientData: Partial<Ingredient>): Promise<Ingredient> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    
    const ingredient = this.ingredientsRepository.create({
      ...ingredientData,
      user,
    });
  
    return this.ingredientsRepository.save(ingredient);
  }
}
