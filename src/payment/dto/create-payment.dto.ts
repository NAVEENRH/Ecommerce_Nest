import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {

    @ApiProperty({ required: true })
    amount: number;

    @ApiProperty({ required: true })
    mode: string;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    productId: number;

    @ApiProperty()
    orderId: number;

}
