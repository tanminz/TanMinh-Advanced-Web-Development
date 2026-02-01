import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductImage, ProductService } from '../product-service';

@Component({
  selector: 'app-service-product-image-event',
  standalone: false,
  templateUrl: './service-product-image-event.html',
  styleUrl: './service-product-image-event.css',
})
export class ServiceProductImageEventComponent {
  products: ProductImage[] = [];

  constructor(
    public productService: ProductService,
    private router: Router
  ) {
    this.products = this.productService.getProductsImages();
  }

  viewDetail(id: string) {
    this.router.navigate(['service-product-image-event', id]);
  }
}
