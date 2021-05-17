import { UserEntity } from "src/auth/entities/user.entity";
import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'orderdetails'})
export class OrderDetail {

    @PrimaryGeneratedColumn()
    orderDetailId:number 

    @Column({type:'decimal',precision:10})
    orderAmount:number

    @Column({type:'integer'})
    orderQty:number

    // @Column({type:'integer',default:0})
    // orderId:number;

    @ManyToOne(()=>Order,(order)=>order.orderId)
    @JoinColumn({name:'orderId'})
    orderId:Order;

    @ManyToOne(()=>Product,(product)=>product.productId)
    @JoinColumn({name:'productId'})
    productId:Product;

    @ManyToOne(()=>UserEntity,(userEntity)=>userEntity.userId)
    @JoinColumn({name:'userId'})
    userId:UserEntity
    

}
