import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
  sku?: string;
}

@Component({
  selector: 'app-ex63-products',
  standalone: false,
  templateUrl: './ex63-products.html',
  styleUrl: './ex63-products.css',
})
export class Ex63ProductsComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    const url = '/api/products?t=' + Date.now();
    this.http.get<Product[]>(url, { withCredentials: true }).subscribe({
      next: (list) => {
        this.products = list || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.products = [];
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  addToCart(p: Product): void {
    this.http.post<{ cart: unknown[] }>('/api/cart/add', p, { withCredentials: true }).subscribe({
      next: () => {},
      error: () => {}
    });
  }

  goToCart(): void {
    this.router.navigate(['/ex63']);
  }
}
