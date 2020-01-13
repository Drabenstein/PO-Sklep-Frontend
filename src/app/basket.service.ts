import { Product } from 'src/app/models/product.model';
import { CheckoutItem } from './models/checkout-item.model';
import { Injectable } from '@angular/core';
import { ArgumentOutOfRangeError, Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basketItems: CheckoutItem[] = [];
  private basketItemsSubject= new BehaviorSubject<CheckoutItem[]>(this.basketItems);

  constructor() { }

  get Items(): Observable<CheckoutItem[]> {
    return this.basketItemsSubject.asObservable();
  }

  getItems(): CheckoutItem[] {
    return this.basketItems.slice();
  }

  addToBasket(product: Product) {
    let foundItem = this.basketItems.find(item => {
      return item.productId === product.productId;
    })

    if(foundItem) {
      foundItem.count++;
    }
    else {
      this.basketItems.push(new CheckoutItem(product, 1));
    }

    this.basketItemsSubject.next(this.basketItems.slice());
  }

  changeCount(checkoutItem: CheckoutItem, newCount: number) {
    if(newCount <= 0) {
      throw new ArgumentOutOfRangeError();
    }
    
    let item = this.basketItems.find(item => {
      return item.productId === checkoutItem.productId;
    });

    if(item) {
      item.count = newCount;
      this.basketItemsSubject.next(this.basketItems);
    }
    else {
      throw new Error(`${checkoutItem} not found in the basket`);
    }
  }

  removeFromBasket(checkoutItem: CheckoutItem) {
    this.basketItems = this.basketItems.filter(item => {
      return item.productId !== checkoutItem.productId;
    });
    this.basketItemsSubject.next(this.basketItems.slice());
  }
}
