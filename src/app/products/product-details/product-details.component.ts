import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
import { NewReviewFormComponent } from './new-review-form/new-review-form.component';
import { BasketService } from './../../basket.service';
import { ProductService } from './../../product.service';
import { Product } from 'src/app/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  rating: number = 0.0;
  addReviewModalRef: BsModalRef;
  modalConfig = {
    animated: true,
    keyboard: true
  };

  constructor(private route: ActivatedRoute, private productService: ProductService, private basketService: BasketService, private modalService: BsModalService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.updateProduct(+params['id']);
      this.recalculateAveragerating();
    });
  }

  private updateProduct(id: number) {
    this.productService.getProductById(id).subscribe(item => {
      this.product = item;
      this.recalculateAveragerating();
    })
  }

  private recalculateAveragerating() {
    if(this.product.reviews != null && this.product.reviews.length > 0) {
      this.rating = this.product.reviews.reduce((a, b, i, arr) => a + b.stars, 0.0) / this.product.reviews.length;
    }
    else {
      this.rating = 0.0;
    }
  }

  onAddToBasket() {
    this.basketService.addToBasket(this.product);
  }

  openModal(template: TemplateRef<any>) {
    this.addReviewModalRef = this.modalService.show(NewReviewFormComponent, this.modalConfig);
    this.addReviewModalRef.content.productId = this.product.productId;
  }
}
