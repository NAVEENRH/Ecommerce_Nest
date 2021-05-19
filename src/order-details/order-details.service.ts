import { Injectable } from '@nestjs/common';
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
    @InjectRepository(OrderDetail) private orderDetailsRepository: Repository<OrderDetail>,
    private orderService: OrderService,
    private userService: UserService,
    private productService: ProductService
  ) { }

  async create(uId: string, oId: number, pId: number, createOrderDetailDto: CreateOrderDetailDto) {
    try {
      const user = await this.userService.findById(uId);
      console.log(user);
      const order = await this.orderService.findOne(oId);
      console.log(order);
      const product = await this.productService.findOne(pId);
      const { qty } = createOrderDetailDto;
      return this.orderDetailsRepository.save({
        quantity: qty,
        userId: user,
        _orderId: order,
        get orderId() {
          return this._orderId;
        },
        set orderId(value) {
          this._orderId = value;
        },
        productId: product
      });
    } catch (err) {
      console.log(err)
    }
  }

  async findAll(userId: string) {
    const user = await this.userService.findById(userId);
    return this.orderDetailsRepository.find({ where: { userId: user } });
  }

  findOne(id: number,) {
    return this.orderDetailsRepository.findOne(id)
      .then((data) => {
        return data;
      })
      .catch(err => console.log(err))
  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return this.orderDetailsRepository.update(id, {
      quantity: updateOrderDetailDto.qty
    });
  }

  remove(id: number) {
    return this.orderDetailsRepository.delete(id);
  }
}
