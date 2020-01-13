import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { CheckoutBasketComponent } from './checkout/checkout-basket/checkout-basket.component';
import { CheckoutSummaryComponent } from './checkout/checkout-summary/checkout-summary.component';
import { DeliveryComponent } from './checkout/delivery/delivery.component';
import { PaymentComponent } from './checkout/payment/payment.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'

import { HomeComponent } from './home/home.component';

const routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'checkout', component: CheckoutComponent, children: [
        { path: '', component: CheckoutBasketComponent },
        { path: 'delivery', component: DeliveryComponent },
        { path: 'payment', component: PaymentComponent },
        { path: 'summary', component: CheckoutSummaryComponent }
    ] },
    { path: 'products', component: ProductsComponent, children: [
        { path: '', component: ProductListComponent },
        { path: ':id', component: ProductDetailsComponent }
    ] }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }