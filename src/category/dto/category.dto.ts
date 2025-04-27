import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  //   @Type(() => Number)
  //   @IsInt()
  //   @IsNotEmpty()
  //   createdBy: number;
}
