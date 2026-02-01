import { Injectable } from '@angular/core';

export interface ProductImage {
  ProductId: string;
  ProductName: string;
  Price: number;
  Image: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsImage: ProductImage[] = [
    {
      ProductId: 'p1',
      ProductName: 'Coca',
      Price: 100,
      Image: 'assets/image/h1.jpg',
    },
    {
      ProductId: 'p2',
      ProductName: 'Pepsi',
      Price: 300,
      Image: 'assets/image/h2.webp',
    },
    {
      ProductId: 'p3',
      ProductName: 'Sting',
      Price: 200,
      Image: 'assets/image/h3.jpg',
    },
  ];

  getProductsImages(): ProductImage[] {
    return this.productsImage;
  }

  getProductDetail(id: string): ProductImage | undefined {
    return this.productsImage.find((x) => x.ProductId === id);
  }
}
