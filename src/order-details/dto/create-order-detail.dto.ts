import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDetailDto {
    @ApiProperty()
    qty: number;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    orderId: number;

    @ApiProperty()
    productId: number;
}
