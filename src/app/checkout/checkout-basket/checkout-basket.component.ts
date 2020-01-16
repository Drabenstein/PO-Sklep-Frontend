import { BasketService } from './../../basket.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CheckoutItem } from 'src/app/models/checkout-item.model';
import { Product } from 'src/app/models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout-basket',
  templateUrl: './checkout-basket.component.html',
  styleUrls: ['./checkout-basket.component.scss']
})
export class CheckoutBasketComponent implements OnInit, OnDestroy {
  priceSummary: number;
  isBasketEmpty: Boolean;
  basketSubscription: Subscription;

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.basketSubscription = this.basketService.Items.subscribe(items => {
      this.recalculateSummary(items);
      this.isBasketEmpty = items.length === 0;
    });
  }

  ngOnDestroy(): void {
    this.basketSubscription.unsubscribe();
  }

  recalculateSummary(items: CheckoutItem[]) {
    let priceSummary: number = 0;
    items.forEach(element => {
      priceSummary += element.price * element.count;
    });
    this.priceSummary = priceSummary;
  }
}
