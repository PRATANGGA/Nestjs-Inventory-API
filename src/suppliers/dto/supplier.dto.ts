import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class SupplierDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  contactInfo?: string;
}
