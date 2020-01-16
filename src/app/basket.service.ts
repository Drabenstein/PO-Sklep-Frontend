import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Product } from 'src/app/models/product.model';
import { CheckoutItem } from './models/checkout-item.model';
import { Injectable } from '@angular/core';
import { ArgumentOutOfRangeError, Subject, Observable, BehaviorSubject, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basketItems: CheckoutItem[] = [];
  private basketItemsSubject = new BehaviorSubject<CheckoutItem[]>(this.basketItems);
  private paymentTypeId: number = null;
  private deliveryMethodId: number = null;

  private url = 'https://localhost:5001/api/order';
  constructor(private http: HttpClient) { }

  get Items(): Observable<CheckoutItem[]> {
    return this.basketItemsSubject.asObservable();
  }

  addToBasket(product: Product) {
    let foundItem = this.basketItems.find(item => {
      return item.productId === product.productId;
    })

    if (foundItem) {
      foundItem.count++;
    }
    else {
      this.basketItems.push(new CheckoutItem(product, 1));
    }

    this.basketItemsSubject.next(this.basketItems.slice());
  }

  changeCount(checkoutItem: CheckoutItem, newCount: number) {
    if (newCount <= 0) {
      throw new ArgumentOutOfRangeError();
    }

    let item = this.basketItems.find(item => {
      return item.productId === checkoutItem.productId;
    });

    if (item) {
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

  set PaymentTypeId(value: number) {
    this.paymentTypeId = value;
  }

  set DeliveryMethodId(value: number) {
    this.deliveryMethodId = value;
  }

  makeOrderByClientId(clientId: number): Observable<number> {
    if(this.deliveryMethodId == null || this.basketItems.length === 0) {
      return throwError('Brak odpowiednich danych w koszyku');
    }

    let param = { params: new HttpParams().set('id', clientId.toString()) };
    let order = this.createOrder();
    return this.http.post<any>(`${this.url}/add`, order, param)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  makeOrderByClientEmail(email: string): Observable<number> {
    if(this.deliveryMethodId == null || this.basketItems.length === 0) {
      return throwError('Brak odpowiednich danych w koszyku');
    }

    let param = { params: new HttpParams().set('email', email) };
    let order = this.createOrder();
    return this.http.post<any>(`${this.url}/add`, order, param)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  private createOrder(): any {
    var order = { paymentTypeId: this.paymentTypeId, deliveryMethodId: this.deliveryMethodId, orderItems: [] };
    for (let item of this.basketItems) {
      order.orderItems.push({ productId: item.productId, count: item.count });
    }
    return order;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } 
    else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
