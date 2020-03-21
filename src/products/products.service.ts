import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from './product.model'

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);
        return prodId;
    }

    fetchProducts() {
        return [...this.products]
    }

    getSingleProduct(prodId: string) {
        const product = this.products.find(product => product.id === prodId)
        if(!product) {
            throw new NotFoundException('Could not find product')
        }
        return { ...product }
    }
}