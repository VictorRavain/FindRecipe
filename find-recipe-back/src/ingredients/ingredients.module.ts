import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { Ingredient } from './ingredient.entity';
import { UsersModule } from 'src/user/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient]), UsersModule],
  providers: [IngredientsService],
  controllers: [IngredientsController],
  exports: [IngredientsService],
})
export class IngredientsModule {}
