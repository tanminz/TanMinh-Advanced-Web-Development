import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image?: string;
  sku?: string;
  qty: number;
  remove?: boolean;
}

@Component({
  selector: 'app-ex63-cart',
  standalone: false,
  templateUrl: './ex63-cart.html',
  styleUrl: './ex63-cart.css',
})
export class Ex63CartComponent implements OnInit {
  cart: CartItem[] = [];
  loading = true;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    const url = '/api/cart?t=' + Date.now();
    this.http.get<{ cart: CartItem[] }>(url, { withCredentials: true }).subscribe({
      next: (res) => {
        this.cart = (res?.cart || []).map(i => ({ ...i, remove: false }));
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cart = [];
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  itemTotal(item: CartItem): number {
    return (item.price || 0) * (item.qty || 1);
  }

  grandTotal(): number {
    return this.cart.filter(i => !i.remove).reduce((s, i) => s + this.itemTotal(i), 0);
  }

  updateCart(): void {
    const items = this.cart.map(i => ({ ...i, qty: i.remove ? 0 : i.qty }));
    this.http.put<{ cart: CartItem[] }>('/api/cart', { items }, { withCredentials: true }).subscribe({
      next: (res) => {
        this.cart = (res?.cart || []).map(i => ({ ...i, remove: false }));
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  continueShopping(): void {
    this.router.navigate(['/ex62']);
  }

  checkout(): void {
    this.http.post<{ success: boolean }>('/api/cart/checkout', {}, { withCredentials: true }).subscribe({
      next: (res) => {
        if (res?.success) {
          this.cart = [];
          alert('Order saved successfully!');
          this.router.navigate(['/ex62']);
        }
      },
      error: (err) => alert(err?.error?.message || 'Checkout failed')
    });
  }
}
