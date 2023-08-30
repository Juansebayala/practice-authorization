import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
import { CommonModule } from './modules/common/common.module';

@Module({
  imports: [CommonModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
