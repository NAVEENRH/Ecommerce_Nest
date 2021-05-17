import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { ProductService } from 'src/product/product.service';
import { OrderService } from 'src/order/order.service';

@Module({
  imports:[TypeOrmModule.forFeature([Payment,Product,Order])],
  controllers: [PaymentController],
  providers: [PaymentService,ProductService,OrderService]
})
export class PaymentModule {}
