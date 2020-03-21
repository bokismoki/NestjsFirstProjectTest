import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {
        const generatedId = this.productsService.insertProduct(
            prodTitle,
            prodDesc,
            prodPrice,
        );
        return { id: generatedId };
    }

    @Get()
    getAllProducts() {
        return this.productsService.fetchProducts()
    }

    @Get(':prodId')
    getProduct(@Param('prodId') prodId: string) {
        return this.productsService.getSingleProduct(prodId)
    }

    @Patch(':id')
    updateProduct(@Param('prodId') prodId: string, @Body('title') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number) {
        this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice)
    }
}