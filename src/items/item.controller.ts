import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ItemDto } from './dto';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}
  @Post()
  createItem(@Body() dto: ItemDto) {
    console.log(dto);
    return this.itemService.createItem(dto);
  }

  @Get(':id')
  getItemById(@Param('id', ParseIntPipe) id: number) {
    return this.itemService.getItemById(id);
  }

  @Get()
  getAllItems() {
    return this.itemService.getItemsAll();
  }

  @Delete(':id')
  deleteItem(@Param('id', ParseIntPipe) id: number) {
    const item = this.itemService.deleteItem(id);
    return 'item successfully deleted';
  }
  @Patch(':id')
  async updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ItemDto,
  ) {
    return await this.itemService.updateItem(id, dto);
  }

  @Get('summary/supplier')
  getSupplierSummary() {
    return this.itemService.getSuppliersSummary();
  }

  @Get('summary/category')
  getCategorySummary() {
    return this.itemService.getSummaryCategory();
  }
}
