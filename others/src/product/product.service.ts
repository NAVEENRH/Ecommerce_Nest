import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  create(createProductDto: CreateProductDto) {
    return this.productRepository.save({
      productName: createProductDto.name,
      productImage: createProductDto.image,
    });
  }

  findAll() {
    return this.productRepository.find();
    // .then((data) => {
    //   const result = data.map((d) => ({
    //     name: d.productName,
    //     image: d.productImage,
    //   }));
    //   return Promise.resolve(result);
    // });
  }

  findOne(id: number) {
    return this.productRepository.findOne(id).then((data) => {
      if (!data) throw new NotFoundException(); //throw new HttpException({}, 204);
      return data;
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(
      { productId: id },
      {
        productName: updateProductDto.name,
        productImage: updateProductDto.image,
      },
    );
  }

  remove(id: number) {
    return this.productRepository.delete({ productId: id });
  }
}
