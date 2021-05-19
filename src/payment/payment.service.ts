import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { Like, Repository } from 'typeorm';
import { OrderService } from 'src/order/order.service';
import { UserService } from 'src/auth/user/user.service';
import { ProductService } from 'src/product/product.service';


@Injectable()
export class PaymentService {

  constructor(
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
    private userService: UserService,
    private orderService: OrderService,
    private productService: ProductService
  ) { }

  async create(userId: string, orderId: number, productId: number, createPaymentDto: CreatePaymentDto) {
    try {
      const user = await this.userService.findById(userId)
      const order = await this.orderService.findOne(orderId)
      const product = await this.productService.findOne(productId)
      console.log("payment order", order)
      const { amount, mode } = createPaymentDto;
      return this.paymentRepository.save({
        paymentAmount: amount,
        paymentMode: mode,
        userId: user,
        productId: product,
        _orderId: order,
        get orderId() {
          return this._orderId;
        },
        set orderId(value) {
          this._orderId = value;
        },
      })
    } catch (err) {
      console.log(err)
    }
  }


  async findAll(userId: string) {
    try {
      const user = await this.userService.findById(userId)
      return this.paymentRepository.find({ where: { userId: user } });
    } catch (err) {
      console.log(err);
    }
  }


  findOne(id: number) {
    return this.paymentRepository.findOne(id).then((data) => {
      if (!data) throw new NotFoundException(); //throw new HttpException({}, 204);
      return data;
    }).catch(err => console.log(err))
  }


  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.paymentRepository.update(id,
      {
        paymentAmount: updatePaymentDto.amount,
        paymentMode: updatePaymentDto.mode
      });
  }

  remove(id: number) {
    return this.paymentRepository.delete(id);
  }
}
