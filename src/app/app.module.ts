import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import localePl from '@angular/common/locales/pl'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule, RatingModule, ModalModule } from 'ngx-bootstrap';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutListComponent } from './checkout/checkout-basket/checkout-list/checkout-list.component';
import { CheckoutBasketComponent } from './checkout/checkout-basket/checkout-basket.component';
import { DeliveryComponent } from './checkout/delivery/delivery.component';
import { PaymentComponent } from './checkout/payment/payment.component';
import { CheckoutSummaryComponent } from './checkout/checkout-summary/checkout-summary.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { NewReviewFormComponent } from './products/product-details/new-review-form/new-review-form.component';

registerLocaleData(localePl, 'pl-PL');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CheckoutComponent,
    CheckoutListComponent,
    CheckoutBasketComponent,
    DeliveryComponent,
    PaymentComponent,
    CheckoutSummaryComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ProductsComponent,
    NewReviewFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule,
    RatingModule,
    ModalModule.forRoot(),
    FontAwesomeModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    NewReviewFormComponent
  ]
})
export class AppModule { 
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
