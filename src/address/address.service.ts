import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/auth/user/user.service';
import { OrderService } from 'src/order/order.service';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    private userService: UserService,
  ) { }
  async create(uid: string, createAddressDto: CreateAddressDto) {
    const user = await this.userService.findById(uid);
    const { city, line1, line2, pincode, state } = createAddressDto;
    return this.addressRepository.save({
      city,
      line1,
      line2,
      pincode,
      state,
      userId: user,
      createdAt: new Date().toISOString(),
    });
  }

  async findAll(userId: string) {
    const user = await this.userService.findById(userId);
    return this.addressRepository.find({ where: { userId: user } });
  }

  async findOne(id: number) {
    return this.addressRepository.findOne(id).then((data) => {
      if (!data) throw new NotFoundException();
      return data;
    });
  }


  update(id: number, updateAddressDto: UpdateAddressDto) {
    const { line1, line2, city, state, pincode } = updateAddressDto;
    return this.addressRepository.update(id, {
      line1,
      line2,
      city,
      state,
      pincode
    });
  }


  remove(id: number) {
    return this.addressRepository.delete({ id });
  }
}
