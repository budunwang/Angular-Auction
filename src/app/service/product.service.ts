import {Injectable} from '@angular/core';

@Injectable()
export class ProductService {
  private products: Array<Product> = [
    new Product(1, 'first', 121, 3.5, 'Hello', ['12', '2']),
    new Product(2, 'second', 131, 4.5, 'Hello', ['12', '2']),
    new Product(3, 'third', 11, 2.5, 'Hello', ['12', '2']),
    new Product(4, 'fourth', 21, 3, 'Hello', ['12', '2']),
    new Product(5, 'fifth', 221, 3, 'Hello', ['12', '2']),
    new Product(6, 'sixth', 181, 4.5, 'Hello', ['12', '2']),
  ];

  private comments: Array<Comment> = [
    new Comment(1, 1, '2017-07-20 23:33:22', 'Li', 3, 'Hao'),
    new Comment(2, 1, '2017-07-20 23:33:23', 'Mi', 4, 'Hao de'),
    new Comment(3, 1, '2017-07-20 23:33:24', 'Wi', 2, 'Hao ba'),
    new Comment(4, 2, '2017-07-20 23:33:25', 'Ai', 5, 'Hao e'),
    new Comment(5, 2, '2017-07-20 23:33:26', 'Yi', 2, 'Hao q'),
    new Comment(6, 3, '2017-07-20 23:33:27', 'Ti', 1, 'Hao'),
  ];

  constructor() {
  }

  getProducts(): Array<Product> {
    return this.products;
  }

  getProductById(id: number): Product {
    return this.products.find((product) => product.id === id);
  }

  getCommentsByProductId(id: number): Array<Comment> {
    return this.comments.filter((comment) => comment.productId === id);
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
