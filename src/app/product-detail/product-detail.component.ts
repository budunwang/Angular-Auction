import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, Comment, ProductService} from '../service/product.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private product: Product;
  private comments: Array<Comment>;

  private newRating: number = 4;
  private newComment: string = '';

  private isCommentHide: boolean = true;


  constructor(private route: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit() {
    const productId = this.route.snapshot.params['id'];
    this.productService.getProductById(Number(productId))
      .subscribe(product => this.product = product
      );
    this.productService.getCommentsByProductId(Number(productId))
      .subscribe(comments => this.comments = comments
      );
  }

  addNewComment() {
    const comment = new Comment(0, this.product.id, new Date().toISOString(), 'w', this.newRating, this.newComment);
    this.comments.unshift(comment);

    this.newRating = 4;
    this.newComment = '';
    this.isCommentHide = true;

    const sum = this.comments.reduce((sum, comment) => sum + comment.rating, 0);
    this.product.rating = sum / this.comments.length;
  }

  ratingClickHandle(index: number) {
    this.newRating = index;
  }

  commentHidden() {
    this.isCommentHide = !this.isCommentHide;
  }
}
