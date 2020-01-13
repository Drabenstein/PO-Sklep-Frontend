import { Product } from './product.model';

export class CheckoutItem {
    public productId: number;
    public imageUrl: String;
    public producerName: String;
    public name: String;
    public price: number;
    public count: number;

    constructor(product: Product, count: number) {
        this.productId = product.productId;
        this.imageUrl = product.imageUrl;
        this.producerName = product.producerName;
        this.name = product.name;
        this.price = product.price;
        this.count = count;
    }
}