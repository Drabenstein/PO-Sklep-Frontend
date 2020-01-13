import { ProductService } from 'src/app/product.service';
import { BsModalRef } from 'ngx-bootstrap';
import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Review } from 'src/app/models/review.model';

@Component({
  selector: 'app-new-review-form',
  templateUrl: './new-review-form.component.html',
  styleUrls: ['./new-review-form.component.scss']
})
export class NewReviewFormComponent implements OnInit {
  @ViewChild('addReviewModalForm', { static: false }) modalForm: NgForm;
  productId: number;
  newReview = {
    reviewer: '',
    rating: 3.0,
    comment: null
  };

  constructor(public modalRef: BsModalRef, private productService: ProductService) { }

  ngOnInit() {
  }

  confirm() {
    if (this.modalForm.valid) {
      this.productService.addReview(this.productId, new Review({
        author: this.newReview.reviewer,
        stars: this.newReview.rating,
        comment: this.newReview.comment
      }));
      console.log(this.modalForm);
      this.modalRef.hide();
    }
  }

  decline() {
    this.modalRef.hide();
  }
}