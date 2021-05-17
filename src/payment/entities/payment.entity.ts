import { UserEntity } from "src/auth/entities/user.entity";
import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'payment'})
export class Payment {

    @PrimaryGeneratedColumn()
    paymentId:number

    @Column({default:'pending'})
    paymentStatus:string

    @Column({default:'By Cash'})
    paymentMode:string

    @Column({default:0,type:'decimal',precision:10})
    payAmount:number

    @Column({type:'datetime',nullable:true})
    paymentDate:Date

    @ManyToOne(()=>Product,(product)=>product.productId)
    @JoinColumn({name:'productId'})
    productId:Product

    @ManyToOne(()=>Order,(order)=>order.orderId)
    @JoinColumn({name:'orderId'})
    orderId:Order;

    @ManyToOne(()=>UserEntity,(userEntity)=>userEntity.userId)
    @JoinColumn({name:'userId'})
    userId:UserEntity
}
