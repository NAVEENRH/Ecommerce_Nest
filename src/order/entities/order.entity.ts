import { type } from 'node:os';
import { UserEntity } from 'src/auth/entities/user.entity';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { Product } from 'src/product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";

@Entity({ name: 'orders' })
export class Order {
    @PrimaryGeneratedColumn()
    orderId: number;

    @Column({ nullable: false })
    orderAmount: number;

    @Column({ nullable: false })
    orderQty: number;

    @Column({ type: "datetime", default: () => 'CURRENT_TIMESTAMP' })
    orderDate: Date;

    @Column({ type: 'datetime', nullable: false })
    orderShippingDate: Date;

    @Column({ default: 'pending' })
    orderStatus: string;

    @ManyToOne(() => UserEntity, (user) => user.userId)
    @JoinColumn({ name: 'userId' })
    userId: UserEntity;

    @ManyToOne(() => Product, (product) => product.productId)
    @JoinColumn({ name: 'productId' })
    productId: Product;

    @OneToMany(() => OrderDetail, (orderDetails) => orderDetails.orderId)
    @JoinColumn({ name: 'orderDetailsId' })
    orderDetailsId: OrderDetail;


    @OneToMany(() => Payment, (payment) => payment.paymentId)
    @JoinColumn({ name: 'payment' })
    paymentId: Payment[];


}
