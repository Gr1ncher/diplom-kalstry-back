import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';

@Module({
  imports: [MikroOrmModule.forFeature([ProductModel])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
