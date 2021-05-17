import { ProductService } from './../product/product.service';
import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsController } from './order-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { Order } from 'src/order/entities/order.entity';
import { OrderService } from 'src/order/order.service';
import { Product } from 'src/product/entities/product.entity';


@Module({
  imports:[TypeOrmModule.forFeature([OrderDetail,Order,Product])],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService,OrderService,ProductService]
})
export class OrderDetailsModule {}
