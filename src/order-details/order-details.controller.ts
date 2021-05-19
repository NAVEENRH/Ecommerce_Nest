import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@ApiTags('order-details')
@UseGuards(JwtAuthGuard)
@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) { }

  @ApiNotFoundResponse({ description: 'Data not Posted' })
  @ApiOkResponse({ description: "Data Posted Successfully" })
  @Post()
  create(@Request() req: any, @Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailsService.create(req.user.userId, req.orderId1, req.productId, createOrderDetailDto);
  }


  @ApiNotFoundResponse({ description: 'Data Not Found' })
  @ApiOkResponse({ description: "All Data Found" })
  @Get()
  findAll(@Request() req: any) {
    return this.orderDetailsService.findAll(req.user.userId);
  }


  @ApiNotFoundResponse({ description: 'Data Not Found ' })
  @ApiOkResponse({ description: "One Data Found" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderDetailsService.findOne(+id);
  }


  @ApiNotFoundResponse({ description: 'Data Not Updated' })
  @ApiOkResponse({ description: "Data Updated Successfully" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDetailDto: UpdateOrderDetailDto) {
    return this.orderDetailsService.update(+id, updateOrderDetailDto);
  }


  @ApiNotFoundResponse({ description: 'Data Not Deleted' })
  @ApiOkResponse({ description: "Data Deleted Successfully" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderDetailsService.remove(+id);
  }
}
