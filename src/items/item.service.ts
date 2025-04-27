import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemDto } from './dto';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';

@Injectable()
export class ItemService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async createItem(dto: ItemDto) {
    try {
      const item = await this.prisma.items.create({
        data: {
          name: dto.name,
          description: dto.description,
          price: dto.price,
          quantity: dto.quantity,
          categoryId: dto.categoryId,
          supplierId: dto.supplierId,
          createdBy: dto.createdBy,
        },
        select: {
          name: true,
          description: true,
          price: true,
          quantity: true,
        },
      });
      return {
        data: {
          name: item.name,
          description: item.description,
          price: item.price,
          quantity: item.quantity,
        },
      };
    } catch (error) {
      throw new HttpException(
        'Gagal membuat item',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getItemById(id: number) {
    if (!id) {
      throw new HttpException('items id not found', HttpStatus.BAD_REQUEST);
    }
    try {
      const item = await this.prisma.items.findUnique({
        where: {
          id: id,
        },
        select: {
          name: true,
          description: true,
          price: true,
          quantity: true,
        },
      });
      if (!item) {
        throw new HttpException('items not found', HttpStatus.NOT_FOUND);
      }
      return {
        data: {
          item,
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Failed to get item',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getItemsAll() {
    try {
      const items = await this.prisma.items.findMany({
        select: {
          name: true,
          description: true,
          price: true,
          quantity: true,
        },
      });
      return {
        data: items, // return items directly under data
      };
    } catch (error) {
      throw new HttpException(
        'Failed to get all items',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteItem(id: number) {
    try {
      if (!id) {
        throw new HttpException('items id not found', HttpStatus.BAD_REQUEST);
      }
      const item = await this.prisma.items.delete({
        where: {
          id: id,
        },
      });
      return {
        message: 'item successfully deleted',
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException(
          'Failed to delete item',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  async updateItem(id: number, dto: ItemDto) {
    if (!id) {
      throw new HttpException('Item id not found', HttpStatus.BAD_REQUEST);
    }

    try {
      const existingItem = await this.prisma.items.findUnique({
        where: { id },
      });

      if (!existingItem) {
        throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
      }

      const updatedItem = await this.prisma.items.update({
        where: { id },
        data: {
          name: dto.name,
          description: dto.description,
          price: dto.price,
          quantity: dto.quantity,
          categoryId: dto.categoryId,
          supplierId: dto.supplierId,
          createdBy: dto.createdBy,
        },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          quantity: true,
        },
      });

      return {
        message: 'Item successfully updated',
        data: updatedItem,
      };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError ||
        error instanceof PrismaClientUnknownRequestError
      ) {
        throw new HttpException(
          'Failed to update item',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getSuppliersSummary() {
    const summary = await this.prisma.suppliers.findMany({
      select: {
        id: true,
        name: true,
        items: {
          select: {
            name: true,
            description: true,
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

  async getSummaryCategory() {
    const summary = await this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        items: {
          select: {
            name: true,
            description: true,
            price: true,
            quantity: true,
          },
        },
      },
    });

    const result = summary.map((category) => {
      const totalItems = category.items.length;
      const totalStockValue = category.items.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.quantity),
        0,
      );
      const averagePrice =
        category.items.length > 0
          ? category.items.reduce(
              (acc, item) => acc + item.price.toNumber(),
              0,
            ) / category.items.length
          : 0;
      return {
        categoryId: category.id,
        categoryName: category.name,
        totalItems,
        totalStockValue,
        averagePrice,
      };
    });

    return {
      data: {
        result,
      },
    };
  }
}
