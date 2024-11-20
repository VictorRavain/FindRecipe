import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recette } from './recette.entity';
import { RecettesService } from './recettes.service';
import { RecettesController } from './recettes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Recette])],
  providers: [RecettesService],
  controllers: [RecettesController],
})
export class RecetteModule {}