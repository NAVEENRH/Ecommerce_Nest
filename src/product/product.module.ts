import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Order } from 'src/order/entities/order.entity';
import { OrderService } from 'src/order/order.service';

@Module({
  // register the modules : features
  imports: [TypeOrmModule.forFeature([Product, Order])],
  // register the controller
  controllers: [ProductController],
  // register the services
  providers: [ProductService, OrderService],
})
export class ProductModule { }
