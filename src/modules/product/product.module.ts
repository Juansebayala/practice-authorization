import { Module } from '@nestjs/common';
import { ProductController } from './interface/product.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  providers: [],
  controllers: [ProductController],
  exports: [],
})
export class ProductModule {}
