import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/auth/user/user.service';
import { OrderService } from 'src/order/order.service';
import { ProductService } from 'src/product/product.service';

import { Repository } from 'typeorm';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { OrderDetail } from './entities/order-detail.entity';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail)private orderDetailrepository:Repository<OrderDetail>,private userService:UserService,private orderService:OrderService,private productService:ProductService 
  ){}

 async create(userId:string,orderId:number,productid:number,createOrderDetailDto: CreateOrderDetailDto) {
    const user = await this.userService.findById(userId)
    const order = await this.orderService.findOne(orderId)
    const product = await this.productService.findOne(productid)

    const {TotalAmount,quantity} = createOrderDetailDto;
    return this.orderDetailrepository.save({
      orderAmount:TotalAmount,
      orderQty:quantity,
      userId:user,
      orderId:order,
      productId:product
        
    })
  }

  findAll() {
    return this.orderDetailrepository.find();
  }

 async findOne(id: number) {
    return this.orderDetailrepository.findOne(id).then((data)=>{
      if(!data) throw new NotFoundException();
      return data;
    });
  }

  async update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return this.orderDetailrepository.update({orderDetailId:id},{
      orderAmount:updateOrderDetailDto.TotalAmount,
      orderQty:updateOrderDetailDto.quantity
    }).then((data)=>{
      if(!data) throw new NotFoundException();
      return data;
    });
  }

  remove(id: number) {
    return this.orderDetailrepository.delete({orderDetailId:id});
  }
}
