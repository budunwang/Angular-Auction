import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, Comment, ProductService} from '../service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private product: Product;
  private comments: Array<Comment>;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit() {
    const productId = this.route.snapshot.params['id'];
    this.product = this.productService.getProductById(Number(productId));
    this.comments = this.productService.getCommentsByProductId(this.product.id);
  }

}
