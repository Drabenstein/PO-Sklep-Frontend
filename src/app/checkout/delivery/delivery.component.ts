import { BasketService } from './../../basket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  deliveryMethods: { name: string, price: number }[];
  selectedId: number;

  constructor(private basketService: BasketService) { }

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
    this.selectedId = 0;
    this.basketService.DeliveryMethodId = this.selectedId + 1;
  }

  onDeliveryTypeSelected(index: number) {
    this.selectedId = index;
    this.basketService.DeliveryMethodId = this.selectedId + 1;
  }
}