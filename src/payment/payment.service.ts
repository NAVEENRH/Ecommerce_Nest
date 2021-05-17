import { UserService } from 'src/auth/user/user.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto'; 
import { Payment } from './entities/payment.entity';
import { ProductService } from 'src/product/product.service';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class PaymentService {
constructor(
  @InjectRepository(Payment) private paymentRepository:Repository<Payment>,
  private userService:UserService,private productService:ProductService,private orderService:OrderService
){

}
  async create(userId:string,productId:number,orderId:number,createPaymentDto: CreatePaymentDto) {
    const user = await this.userService.findById(userId)
    const product = await this.productService.findOne(productId)
    const order = await this.orderService.findOne(orderId)

    const{price,Date,status}=createPaymentDto;
    return this.paymentRepository.save({
      payAmount:price,
      paymentDate:Date,
      paymentStatus:status,
      userId:user,
      productId:product,
      orderId:order
      
    });
  }

  findAll() {
    return this.paymentRepository.find();
  }

  async findOne(id: number) {
    return this.paymentRepository.findOne(id).then((data)=>{
      if(!data) throw new NotFoundException();
      return data;
    })
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.paymentRepository.update({paymentId:id},{
      payAmount:updatePaymentDto.price,
      paymentDate:updatePaymentDto.Date,
      paymentStatus:updatePaymentDto.status
    }).then((data)=>{
      if(!data) throw new NotFoundException();
      return 
    })
  }

  remove(id: number) {
    return this.paymentRepository.delete({paymentId:id});
  }
}
