import { OrderDetail } from 'src/order-details/entities/order-detail.entity';

import { Order } from 'src/order/entities/order.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column({ nullable: false })
  productName: string;

  @Column({ default: 0, type: 'decimal' })
  productPrice: number;

  @Column({ nullable: false })
  productImage: string;

  @Column({ default: 0, type: 'decimal' })
  productSalePrice: number;


  @Column({ default: 10 })
  productStock: number;

  @OneToMany(()=>Payment,(payment)=>payment.productId)
  paymentId:Payment[]

  @OneToMany(()=>Order,(order)=>order.productId)
  orderId:Order[]

  @OneToMany(()=>OrderDetail,(orderDetail)=>orderDetail.productId)
  orderDetailId:OrderDetail[]
}
