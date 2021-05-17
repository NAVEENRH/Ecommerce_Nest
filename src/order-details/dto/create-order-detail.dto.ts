import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDetailDto {

    @ApiProperty()
    TotalAmount:number

    @ApiProperty()
    quantity:number

    @ApiProperty()
    orderId:number

    @ApiProperty()
    productId:number

    @ApiProperty()
    userId:string


}
