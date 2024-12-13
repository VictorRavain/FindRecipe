import { Controller, Get, Delete, Param, NotFoundException, Post, Body, UseGuards } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Ingredient } from './ingredient.entity';
import { Request } from '@nestjs/common';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get()
  @UseGuards(AuthGuard) // Protect the route with the JWT guard
  findAll(@Request() req: any) {
    const userId = req.user.id; 
    return this.ingredientsService.findAllByUser(userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const result = await this.ingredientsService.remove(id);
    if (!result) {
      throw new NotFoundException(`Ingredient with ID ${id} not found`);
    }
    return { message: 'Ingredient deleted successfully' };
  }

  @Post()
  @UseGuards(AuthGuard) 
  create(@Request() req: any, @Body() ingredientData: Partial<Ingredient>) {
    const userId = req.user.id; // Extract userId from authenticated user
    return this.ingredientsService.create(userId, ingredientData);
  }
}
