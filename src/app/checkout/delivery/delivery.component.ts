import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  deliveryMethods: { name: string, price: number }[];
  selectedId: number = 0;

  constructor() { }

  ngOnInit() {
    this.deliveryMethods = [
      {
        name: 'Odbiór osobisty w sklepie stacjonarnym',
        price: 0.0
      },
      {
        name: 'Kurier DPD',
        price: 16.0
      },
      {
        name: 'Kurier Pocztex',
        price: 10.0
      },
      {
        name: 'Kurier DHL',
        price: 18.5
      }
    ];
  }

  onDeliveryTypeSelected(index: number) {
    this.selectedId = index;
  }
}