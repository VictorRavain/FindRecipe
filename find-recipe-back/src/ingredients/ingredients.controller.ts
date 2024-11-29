import { Controller, Get, Delete, Param, NotFoundException } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get()
  findAll() {
    return this.ingredientsService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const result = await this.ingredientsService.remove(id);
    if (!result) {
      throw new NotFoundException(`Ingredient with ID ${id} not found`);
    }
    return { message: 'Ingredient deleted successfully' };
  }
}
