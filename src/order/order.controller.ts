import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { stringify } from 'node:querystring';
import { ProductService } from 'src/product/product.service';

@ApiTags('order')
@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService,
    private productservice: ProductService
  ) { }

  @ApiNotFoundResponse({ description: 'Data not Posted' })
  @ApiOkResponse({ description: "Data Posted Successfully" })
  @Post()
  create(@Request() req: any, @Body() createOrderDto: CreateOrderDto) {
    console.log("constrol user", req.user.userId)
    return this.orderService.create(req.user.userId, req.productId, createOrderDto);
  }


  @ApiNotFoundResponse({ description: 'Data Not Found' })
  @ApiOkResponse({ description: "All Data Found" })
  @Get()
  findAll(@Request() req: any) {
    return this.orderService.findAll(req.user.userId);
  }

  @ApiNotFoundResponse({ description: 'Data Not Found ' })
  @ApiOkResponse({ description: "One Data Found" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @ApiNotFoundResponse({ description: 'Data Not Updated' })
  @ApiOkResponse({ description: "Data Updated Successfully" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }


  @ApiNotFoundResponse({ description: 'Data Not Deleted' })
  @ApiOkResponse({ description: "Data Deleted Successfully" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}

