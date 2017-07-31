import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, Comment, ProductService} from '../service/product.service';
import {Observable, Subscription} from 'rxjs';
import {WebSocketService} from '../service/web-socket.service';

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
  private isWatched: boolean = false;
  private currentBid: number;

  private subscription: Subscription;


  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private webSocketService: WebSocketService) {
  }

  ngOnInit() {
    const productId = this.route.snapshot.params['id'];
    this.productService.getProductById(Number(productId))
      .subscribe(product => {
        this.product = product;
        this.currentBid = product.price;
      });
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

  watchProduct() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.isWatched = !this.isWatched;
      this.subscription = null;
    } else {
      this.isWatched = true;
      this.subscription = this.webSocketService.createObservableSocket('ws://localhost:8085', this.product.id)
        .subscribe(message => {
          const products = JSON.parse(message);
          const currentProduct = products.find(p => p.productId === this.product.id);
          this.currentBid = currentProduct.bid;
        });
    }
  }
}
