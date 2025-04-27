import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupplierDto } from './dto';

@Controller('suppliers')
export class SuppliersController {
  constructor(private supplierService: SuppliersService) {}

  @Post()
  createSupplier(@Body() req: SupplierDto) {
    return this.supplierService.createSupplier({
      name: req.name,
      contactInfo: req.contactInfo,
    });
  }

  @Get(':id')
  getSupplierById(@Param('id', ParseIntPipe) id: number) {
    return this.supplierService.getSupplierById(id);
  }

  @Get()
  getAllSuppliers() {
    return this.supplierService.getSuppliersAll();
  }
}
