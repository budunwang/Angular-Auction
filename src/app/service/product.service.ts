import {EventEmitter, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ProductService {
  private products: Array<Product>;

  private comments: Array<Comment>;

  public searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();

  constructor(private http: Http) {
  }

  getProducts(): Observable<Array<Product>> {
    return this.http.get('/api/products')
      .map(res => res.json());
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get('/api/products/' + id)
      .map(res => res.json());
  }

  getCommentsByProductId(id: number): Observable<Array<Comment>> {
    return this.http.get('/api/products/' + id + '/comments')
      .map(res => res.json());
  }

  getAllCategories(): Array<string> {
    return ['a', 'b', 'c'];
  }

  search(params: ProductSearchParams): Observable<Array<Product>> {
    return this.http.get('/api/products?' + this.encodeParams(params).toString())
      .map(res => res.json());
  }

  encodeParams(params: ProductSearchParams) {
    return Object.keys(params)
      .filter(key => {
        return params[key];
      })
      .reduce((sum: URLSearchParams, key: string) => {
        sum.append(key, params[key]);
        return sum;
      }, new URLSearchParams());
  }
}

export class ProductSearchParams {
  constructor(public title: string,
              public price: number,
              public category: string) {
  }
}

export class Product {
  constructor(public id: number,
              public title: string,
              public price: number,
              public rating: number,
              public desc: string,
              public categories: Array<string>) {
  }
}

export class Comment {
  constructor(public id: number,
              public productId: number,
              public timestamp: string,
              public user: string,
              public rating: number,
              public content: string) {
  }
}
