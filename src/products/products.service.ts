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

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex(product => product.id === id)
        const product = this.products.find(product => product.id === id)
        if (!product) {
            throw new NotFoundException('Could not find product')
        }
        return [product, productIndex]
    }

    getSingleProduct(prodId: string) {
        const product = this.findProduct(prodId)[0]
        return { ...product }
    }

    updateProduct(prodId: string, title: string, description: string, price: number) {
        const [product, index] = this.findProduct(prodId)
        const updatedProduct = { ...product }
        if (title) {
            updatedProduct.title = title
        }
        if (description) {
            updatedProduct.description = description
        }
        if (price) {
            updatedProduct.price = price
        }
        this.products[index] = updatedProduct
    }
}