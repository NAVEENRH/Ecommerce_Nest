import { type } from 'node:os';
import { UserEntity } from 'src/auth/entities/user.entity';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToMany, ManyToOne } from "typeorm";

@Entity({ name: 'orderdetails' })
export class OrderDetail {
    @PrimaryGeneratedColumn()
    orderDetailsId: number;

    @Column({ nullable: false })
    quantity: number;

    @Column({ type: "datetime", default: () => 'CURRENT_TIMESTAMP' })
    orderDate: Date;

    // @Column({ type: 'datetime' })
    // orderShippingDate: Date;

    @Column({ default: 10, type: 'decimal', precision: 2 })
    totalAmount: number;

    @Column({ default: 'pending' })
    orderStatus: string;


    @ManyToOne(() => UserEntity, (user) => user.userId)
    @JoinColumn({ name: "userId" })
    userId: UserEntity;

    @ManyToOne(() => Order, (order) => order.orderId)
    @JoinColumn({ name: "orderId" })
    orderId: Order;

    @ManyToOne(() => Product, (product) => product.productId)
    @JoinColumn({ name: "productId" })
    productId: Product;
}
