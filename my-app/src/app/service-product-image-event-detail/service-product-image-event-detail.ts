import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductImage, ProductService } from '../product-service';

@Component({
  selector: 'app-service-product-image-event-detail',
  standalone: false,
  templateUrl: './service-product-image-event-detail.html',
  styleUrl: './service-product-image-event-detail.css',
})
export class ServiceProductImageEventDetailComponent {
  selectedProduct: ProductImage | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fs: ProductService
  ) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.selectedProduct = this.fs.getProductDetail(id);
      }
    });
  }

  goBack() {
    this.router.navigate(['service-product-image-event']);
  }
}
