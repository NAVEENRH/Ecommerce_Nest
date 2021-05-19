import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ApiTags, ApiNotFoundResponse, ApiOkResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt.guard";

@ApiTags("Product")
@Controller("product")
// @UseGuards(JwtAuthGuard) : apply the guard to all the routes
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Post("bulk")
  createBulk() {
    return this.productService.bulkCreate();
  }

  @Get()
  findAll(
    @Query("page") page: number = 1,
    @Query("size") size: number = 20,
    @Query("minPrice") minPrice: number = 1,
    @Query("maxPrice") maxPrice: number = 5000,
    @Query("searchByTerm") searchByTerm: string,
    @Query("sortByName") sortByName: string,
    @Query("sortByPrice") sortByPrice: string
  ) {
    switch (true) {
      case sortByName == "productSalePrice" && sortByPrice == "ASC":
        return this.productService.findAllPLTH(
          page,
          size,
          minPrice,
          maxPrice,
          searchByTerm,
          sortByName,
          sortByPrice
        );
      case sortByName == "productSalePrice" && sortByPrice == "DESC":
        return this.productService.findAllPHTL(
          page,
          size,
          minPrice,
          maxPrice,
          searchByTerm,
          sortByName,
          sortByPrice
        );
      case sortByName == "productName" && sortByPrice == "ASC":
        return this.productService.findAllNLTH(
          page,
          size,
          minPrice,
          maxPrice,
          searchByTerm,
          sortByName,
          sortByPrice
        );
      case sortByName == "productName" && sortByPrice == "DESC":
        return this.productService.findAllNHTL(
          page,
          size,
          minPrice,
          maxPrice,
          searchByTerm,
          sortByName,
          sortByPrice
        );
    }

    return this.productService.findAll(
      page,
      size,
      minPrice,
      maxPrice,
      searchByTerm,
      sortByName,
      sortByPrice
    );
  }

  @Get("search")
  findByQuery(@Query("q") query: string) {
    return this.productService.findByQuery(query);
  }

  @ApiNotFoundResponse({
    description: "No data is found for the specified ID",
  })
  @ApiOkResponse({ description: "Product Data found" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productService.remove(+id);
  }
}