import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateOrderDto {

    @ApiProperty()
    amount:number

    @ApiProperty() 
    shippingDate:string

    @ApiProperty()
    status?:string
    
    @ApiProperty()
    userId:string

    @ApiProperty()
    productId:number

}
