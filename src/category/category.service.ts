import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}
  async createCategory(dto: CategoryDto) {
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

      const category = await this.prisma.category.create({
        data: {
          name: dto.name,
          description: dto.description,
          createdBy: randomAdmin.id,
        },
      });

      return {
        data: {
          name: category.name,
          description: category.description,
        },
      };
    } catch (error) {
      throw new HttpException(
        'Gagal membuat item',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCategoryById(id: number) {
    if (!id) {
      throw new HttpException('Category id not found', HttpStatus.BAD_REQUEST);
    }
    try {
      const category = await this.prisma.category.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          description: true,
        },
      });
      if (!category) {
        throw new HttpException('items not found', HttpStatus.NOT_FOUND);
      }
      return {
        data: {
          category,
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Failed to get category',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getAllCategory() {
    try {
      const categories = await this.prisma.category.findMany({
        select: {
          name: true,
          description: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return {
        data: {
          categories,
        },
      };
    } catch (error) {
      throw new HttpException(
        'Failed to get all items',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async deleteCategory(id: number) {
    try {
      if (!id) {
        throw new HttpException(
          'Category id not found',
          HttpStatus.BAD_REQUEST,
        );
      }
      const category = this.prisma.category.delete({
        where: {
          id: id,
        },
      });

      return {
        message: 'Category deleted successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Failed to delete category',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
