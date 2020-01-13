import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  selectedId: number = 0;
  paymentMethods: { name: String, methodId: number }[];

  constructor() { }

  ngOnInit() {
    this.paymentMethods = [
      { name: 'Płatność kartą', methodId: 1 },
      { name: 'Płatność online (PayU)', methodId: 2 },
      { name: 'Płatność online (Przelewy24)', methodId: 3 },
      { name: 'Płatność przy odbiorze', methodId: 4}
    ]
  }

  onPaymentTypeSelected(index: number) {
    this.selectedId = index;
  }

  onDeferredPaymentSelected() {
    this.selectedId = null;
  }
}
