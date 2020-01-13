import { Subject, Observable, BehaviorSubject, throwError } from 'rxjs';
import { Review } from './models/review.model';
import { Product } from 'src/app/models/product.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // private appliances = [
  //   new Product({
  //     productId: 6,
  //     producerName: 'Bosch',
  //     name: 'Suszarka',
  //     imageUrl: 'https://f00.esfr.pl/foto/2/19215848625/7eee8c6424345ba698227c47f8e4aa09/samsung-ww70j4273mw,19215848625_7.jpg',
  //     price: 1299.99,
  //     description: 'Wysokie obroty, 16 programów, tryb Eco',
  //     categoryId: 1
  //   }),
  //   new Product({
  //     productId: 7,
  //     producerName: 'ASUS',
  //     name: 'Wentylator',
  //     imageUrl: 'https://f00.esfr.pl/foto/2/19215848625/7eee8c6424345ba698227c47f8e4aa09/samsung-ww70j4273mw,19215848625_7.jpg',
  //     price: 999.99,
  //     description: 'Wysokie obroty, 16 programów, tryb Eco',
  //     categoryId: 1
  //   }),
  //   new Product({
  //     productId: 8,
  //     producerName: 'Beko',
  //     name: 'Robot kuchenny',
  //     imageUrl: 'https://f00.esfr.pl/foto/2/19215848625/7eee8c6424345ba698227c47f8e4aa09/samsung-ww70j4273mw,19215848625_7.jpg',
  //     price: 2500.00,
  //     description: 'Wysokie obroty, 16 programów, tryb Eco',
  //     categoryId: 1
  //   }),
  //   new Product({
  //     productId: 11,
  //     producerName: 'Amica',
  //     name: 'Czajnik',
  //     imageUrl: 'https://f00.esfr.pl/foto/2/19215848625/7eee8c6424345ba698227c47f8e4aa09/samsung-ww70j4273mw,19215848625_7.jpg',
  //     price: 1099.99,
  //     description: 'Wysokie obroty, 16 programów, tryb Eco',
  //     categoryId: 1
  //   }),
  //   new Product({
  //     productId: 321,
  //     producerName: 'Indesit',
  //     name: 'Odkurzacz',
  //     imageUrl: 'https://f00.esfr.pl/foto/2/19215848625/7eee8c6424345ba698227c47f8e4aa09/samsung-ww70j4273mw,19215848625_7.jpg',
  //     price: 1599.69,
  //     description: 'Wysokie obroty, 16 programów, tryb Eco',
  //     categoryId: 1
  //   }),
  //   new Product({
  //     productId: 1,
  //     producerName: 'Bosch',
  //     name: 'Pralka AWU2314',
  //     imageUrl: 'https://f00.esfr.pl/foto/2/19215848625/7eee8c6424345ba698227c47f8e4aa09/samsung-ww70j4273mw,19215848625_7.jpg',
  //     price: 1299.99,
  //     description: 'Wysokie obroty, 16 programów, tryb Eco',
  //     categoryId: 2
  //   }),
  //   new Product({
  //     productId: 2,
  //     producerName: 'ASUS',
  //     name: 'Pralka AWU2314',
  //     imageUrl: 'https://f00.esfr.pl/foto/2/19215848625/7eee8c6424345ba698227c47f8e4aa09/samsung-ww70j4273mw,19215848625_7.jpg',
  //     price: 999.99,
  //     description: 'Wysokie obroty, 16 programów, tryb Eco',
  //     categoryId: 2
  //   }),
  //   new Product({
  //     productId: 3,
  //     producerName: 'Beko',
  //     name: 'Pralka AWU2314',
  //     imageUrl: 'https://f00.esfr.pl/foto/2/19215848625/7eee8c6424345ba698227c47f8e4aa09/samsung-ww70j4273mw,19215848625_7.jpg',
  //     price: 2500.00,
  //     description: 'Wysokie obroty, 16 programów, tryb Eco',
  //     categoryId: 2
  //   }),
  //   new Product({
  //     productId: 4,
  //     producerName: 'Amica',
  //     name: 'Pralka AWU2314',
  //     imageUrl: 'https://f00.esfr.pl/foto/2/19215848625/7eee8c6424345ba698227c47f8e4aa09/samsung-ww70j4273mw,19215848625_7.jpg',
  //     price: 1099.99,
  //     description: 'Wysokie obroty, 16 programów, tryb Eco',
  //     categoryId: 2
  //   }),
  //   new Product({
  //     productId: 5,
  //     producerName: 'Indesit',
  //     name: 'Pralka AWU2314',
  //     imageUrl: 'https://f00.esfr.pl/foto/2/19215848625/7eee8c6424345ba698227c47f8e4aa09/samsung-ww70j4273mw,19215848625_7.jpg',
  //     price: 1599.69,
  //     description: 'Wysokie obroty, 16 programów, tryb Eco',
  //     categoryId: 2
  //   }),
  // ];
  //private appliancesSubject = new BehaviorSubject<Product[]>([]);
  private url = 'https://localhost:5001/api/product';

  constructor(private http: HttpClient) { }

  getProductById(id: number): Observable<Product> {
    let param = { params: new HttpParams().set('id', id.toString()) };
    return this.http.get<Product>(this.url, param)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getProducts(categoryId: number): Observable<Product[]> {
    let param = { params: new HttpParams().set('categoryId', categoryId.toString()) };
    return this.http.get<Product[]>(this.url, param)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  addReview(productId: number, review: Review) {
    // this.appliances.find(item => {
    //   return item.productId === productId
    // }).reviews.push(review);
    // this.appliancesSubject.next(this.appliances.slice());
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
