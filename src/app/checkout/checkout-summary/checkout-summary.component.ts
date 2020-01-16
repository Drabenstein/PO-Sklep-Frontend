import { BasketService } from './../../basket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-summary',
  templateUrl: './checkout-summary.component.html',
  styleUrls: ['./checkout-summary.component.scss']
})
export class CheckoutSummaryComponent implements OnInit {
  orderNumber: number;
  isError: boolean;

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.isError = false;
    this.orderNumber = null;
    this.basketService.makeOrderByClientId(1).subscribe(orderId => {
      console.log('next');
      debugger;
      this.isError = false;
      this.orderNumber = orderId;
    }, err => {
      console.log('err');
      this.isError = true;
    }, () => {
      console.log('compl');
    });
  }

}
