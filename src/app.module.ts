import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { ItemService } from './items/item.service';
import { ItemModule } from './items/item.module';
import { CategoryModule } from './category/category.module';
import { SuppliersController } from './suppliers/suppliers.controller';
import { SuppliersModule } from './suppliers/suppliers.module';

@Module({
  imports: [PrismaModule, ItemModule, CategoryModule, SuppliersModule],
})
export class AppModule {}
