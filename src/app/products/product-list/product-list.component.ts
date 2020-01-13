import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../product.service';
import { BasketService } from '../../basket.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[];

  constructor(private route: ActivatedRoute, private productService: ProductService, private basketService: BasketService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      this.productService.getProducts(+queryParams['category'])
        .subscribe(items => {
          this.products = items;
        })
    });
  }

  onAddToBasket(product: Product) {
    this.basketService.addToBasket(product);
  }
}