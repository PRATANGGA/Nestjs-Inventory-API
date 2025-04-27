import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto';

@Controller('category')
export class CategoryController {
  constructor(private category: CategoryService) {}
  @Post()
  async createCategory(@Body() req: CategoryDto) {
    return await this.category.createCategory({
      name: req.name,
      description: req.description,
    });
  }

  @Get(':id')
  async getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return await this.category.getCategoryById(id);
  }

  @Get()
  async getAllCategories() {
    return await this.category.getAllCategory();
  }

  @Delete(':id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.category.deleteCategory(id);
  }
}
