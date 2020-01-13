import { Review } from './review.model';

export class Product {
    public productId: number;
    public imageUrl: String;
    public producerName: String;
    public name: String;
    public description?: String;
    public price: number;
    public reviews?: Review[];
    public categoryId: number;

    constructor(init: {
        productId: number;
        imageUrl: String;
        producerName: String;
        name: String;
        description?: String;
        price: number;
        categoryId: number;
        reviews?: Review[];
    }) {
        this.productId = init.productId;
        this.imageUrl = init.imageUrl;
        this.producerName = init.producerName;
        this.name = init.name;
        this.description = init.description;
        this.price = init.price;
        this.categoryId = init.categoryId;
        this.reviews = init.reviews == null ? [] : init.reviews;
    }
}