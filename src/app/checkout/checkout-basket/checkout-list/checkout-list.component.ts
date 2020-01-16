import { Subscription } from 'rxjs';
import { BasketService } from './../../../basket.service';
import { CheckoutItem } from '../../../models/checkout-item.model';
import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkout-list',
  templateUrl: './checkout-list.component.html',
  styleUrls: ['./checkout-list.component.scss']
})
export class CheckoutListComponent implements OnInit, OnDestroy {
  checkoutItems: CheckoutItem[] = [];
  basketSubscription: Subscription;

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.basketSubscription = this.basketService.Items.subscribe(items => {
      this.checkoutItems = items;
    });
  }

  deleteItem(index: number) {
    this.basketService.removeFromBasket(this.checkoutItems[index]);
  }

  onCountChange(index: number) {
    if (this.checkoutItems[index].count < 1) {
      this.basketService.changeCount(this.checkoutItems[index], 1);
    }
    else {
      this.basketService.changeCount(this.checkoutItems[index], this.checkoutItems[index].count);
    }
  }

  ngOnDestroy(): void {
    this.basketSubscription.unsubscribe();
  }
}
