import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePaymentDto {
    @ApiProperty()
    status?:string

    @ApiProperty()
    @IsNotEmpty()
    price:number

    @ApiProperty()
    mode:string

    @ApiProperty()
    Date:Date

    @ApiProperty()
    userId:string

    @ApiProperty()
    productId:number

    @ApiProperty()
    orderId:number

}

