import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@ApiTags('Address')
@UseGuards(JwtAuthGuard)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @ApiNotFoundResponse({ description: 'Data not Posted' })
  @ApiOkResponse({ description: "Data Posted Successfully" })
  @Post()
  create(@Request() req: any, @Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(req.user.userId, createAddressDto);
  }


  @ApiNotFoundResponse({ description: 'Data Not Found' })
  @ApiOkResponse({ description: "All Data Found" })
  @Get()
  findAll(@Request() req: any) {
    return this.addressService.findAll(req.user.userId);
  }



  @ApiNotFoundResponse({ description: 'Data Not Found ' })
  @ApiOkResponse({ description: "One Data Found" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }


  @ApiNotFoundResponse({ description: 'Data Not Updated' })
  @ApiOkResponse({ description: "Data Updated Successfully" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }


  @ApiNotFoundResponse({ description: 'Data Not Deleted' })
  @ApiOkResponse({ description: "Data Deleted Successfully" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
