import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupplierDto } from './dto';

@Injectable()
export class SuppliersService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async createSupplier(dto: SupplierDto) {
    try {
      const admins = await this.prisma.admins.findMany({
        select: {
          id: true,
        },
      });
      if (admins.length === 0) {
        throw new HttpException('Not found', HttpStatus.BAD_REQUEST);
      }
      const randomAdmin = admins[Math.floor(Math.random() * admins.length)];

      const supplier = await this.prisma.suppliers.create({
        data: {
          name: dto.name,
          contactInfo: dto.contactInfo,
          createdBy: randomAdmin.id,
        },
      });

      return {
        data: {
          name: supplier.name,
          contactInfo: supplier.contactInfo,
        },
      };
    } catch (error) {
      throw new HttpException(
        'Failed to create supplier',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getSupplierById(id: number) {
    if (!id) {
      throw new HttpException('Supplier id not found', HttpStatus.BAD_REQUEST);
    }
    try {
      const supplier = await this.prisma.suppliers.findUnique({
        where: {
          id: id,
        },
        select: {
          name: true,
          contactInfo: true,
        },
      });

      if (!supplier) {
        throw new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
      }
      return {
        data: {
          name: supplier.name,
          contactInfo: supplier.contactInfo,
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Failed to get supplier',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getSuppliersAll() {
    try {
      const suppliers = await this.prisma.suppliers.findMany({
        select: {
          name: true,
          contactInfo: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return {
        data: {
          suppliers,
        },
      };
    } catch (error) {}
  }

  async getSuppliersSummary() {
    const summary = await this.prisma.suppliers.findMany({
      select: {
        id: true,
        name: true,
        items: {
          select: {
            price: true,
            quantity: true,
          },
        },
      },
    });

    const result = summary.map((supplier) => {
      const totalItems = supplier.items.length;
      const totalSuppliedValue = supplier.items.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.quantity),
        0,
      );

      return {
        supplierId: supplier.id,
        supplierName: supplier.name,
        totalItems,
        totalSuppliedValue,
      };
    });
    return {
      data: {
        suppliers: result,
      },
    };
  }
}
