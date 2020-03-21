import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    async addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {
        const generatedId = await this.productsService.insertProduct(
            prodTitle,
            prodDesc,
            prodPrice,
        );
        return { id: generatedId };
    }

    @Get()
    async getAllProducts() {
        return await this.productsService.fetchProducts()
    }

    @Get(':prodId')
    getProduct(@Param('prodId') prodId: string) {
        return this.productsService.getSingleProduct(prodId)
    }

    @Patch(':id')
    async updateProduct(@Param('id') prodId: string, @Body('title') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number) {
        await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice)
    }

    @Delete(':id')
    async deleteProduct(@Param('id') prodId: string) {
        await this.productsService.deleteProduct(prodId)
    }
}