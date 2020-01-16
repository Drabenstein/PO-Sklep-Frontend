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
  newReview: Review;
  isSending: Boolean;
  errorMessage: String;

  constructor(public modalRef: BsModalRef, private productService: ProductService) { }

  ngOnInit() {
    this.newReview = new Review({
      author: '',
      rating: 3.0,
      comment: null
    });
    this.isSending = false;
  }

  confirm() {
    if (this.modalForm.valid) {
      this.isSending = true;
      this.productService.addReview(this.productId, this.newReview).subscribe(resp => {
        this.modalRef.hide();
      },
        err => {
          this.errorMessage = 'Wystąpił błąd przy dodawaniu opinii';
        });
    }
  }

  decline() {
    this.modalRef.hide();
  }
}