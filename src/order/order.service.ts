import { Injectable, NotFoundException, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Like, Repository } from 'typeorm';
import { UserEntity } from 'src/auth/entities/user.entity';
import { UserService } from 'src/auth/user/user.service';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/entities/product.entity';


@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private userService: UserService,
    private productService: ProductService
  ) { }


  async create(uId: string, pId: number, createOrderDto: CreateOrderDto) {
    try {
      const user = await this.userService.findById(uId);
      const product = await this.productService.findOne(pId);
      // console.log("service product", product.productId);
      //console.log("service User", user);
      const { amount, OSDate, qty } = createOrderDto;
      return this.orderRepository.save({
        orderAmount: amount,
        orderShippingDate: OSDate,
        orderQty: qty,
        userId: user,
        productId: product
      });
    } catch (err) {
      console.log(err);
    }
  }

  async findAll(userId: string,) {
    try {
      const user = await this.userService.findById(userId);
      return this.orderRepository.find({ where: { userId: user } });
    } catch (err) {
      console.log(err)
    }
  }

  findOne(uId: number) {
    return this.orderRepository.findOne(uId)
      .then((data) => {
        console.log(data);
        if (!data) throw new NotFoundException();
        return data;
      }).catch(err => console.log(err))
  }


  async update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      return this.orderRepository
        .update(id, {
          orderAmount: updateOrderDto.amount,
          orderShippingDate: updateOrderDto.OSDate,
          orderQty: updateOrderDto.qty,
        })
    } catch (err) {
      console.log(err)
    }
  }

  remove(id: number) {
    return this.orderRepository.delete(id);
  }
}


