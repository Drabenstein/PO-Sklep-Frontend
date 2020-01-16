import { BasketService } from './../../basket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  selectedId: number;
  paymentMethods: { name: String, methodId: number }[];

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.paymentMethods = [
      { name: 'Płatność kartą', methodId: 1 },
      { name: 'Płatność online (PayU)', methodId: 2 },
      { name: 'Płatność online (Przelewy24)', methodId: 3 },
      { name: 'Płatność przy odbiorze', methodId: 4}
    ];
    this.selectedId = 0;
    this.basketService.PaymentTypeId = 1;
  }

  onPaymentTypeSelected(index: number) {
    this.selectedId = index;
    this.basketService.PaymentTypeId = index + 1;
  }

  onDeferredPaymentSelected() {
    this.selectedId = null;
    this.basketService.PaymentTypeId = null;
  }
}
