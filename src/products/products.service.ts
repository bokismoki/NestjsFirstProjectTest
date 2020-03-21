import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from './product.model'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    async insertProduct(title: string, desc: string, price: number) {
        const newProduct = new this.productModel({ title, description: desc, price });
        const product = await newProduct.save();
        return product.id as string;
    }

    async fetchProducts() {
        const products = await this.productModel.find({}).exec()
        return products as Product[]
    }

    private async findProduct(id: string): Promise<Product> {
        try {
            const product = await this.productModel.findById(id).exec()
            if (!product) {
                throw new NotFoundException('Could not find product')
            }
            return product
        } catch (err) {
            throw new NotFoundException('Could not find product')
        }
    }

    async getSingleProduct(prodId: string) {
        const product = await this.findProduct(prodId)
        return product
    }

    async updateProduct(prodId: string, title: string, description: string, price: number) {
        const updatedProduct = await this.findProduct(prodId)
        if (title) {
            updatedProduct.title = title
        }
        if (description) {
            updatedProduct.description = description
        }
        if (price) {
            updatedProduct.price = price
        }
        updatedProduct.save()
    }

    async deleteProduct(prodId: string) {
        const deletedProductt = await this.productModel.deleteOne({_id: prodId}).exec()
        if(deletedProductt.n === 0) {
            throw new NotFoundException('Could not delete product')
        }
    }
}