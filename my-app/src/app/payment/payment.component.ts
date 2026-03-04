/**
 * MoMo Payment - Thanh toán qua Ví MoMo
 * Tham khảo 1: https://github.com/momo-wallet/
 * Tham khảo 2: https://developers.momo.vn/v3/docs/payment/guides/home
 */
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  amount: number = 50000;
  loading: boolean = false;
  errorMsg: string = '';

  constructor(private http: HttpClient) { }

  private readonly apiUrl = 'http://localhost:3000';

  payWithMoMo() {
    const amount = Number(this.amount) || 50000;
    this.loading = true;
    this.errorMsg = '';
    const redirectBase = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:4200';

    this.http.post<any>(`${this.apiUrl}/payment/momo`, { amount, redirectBase }).subscribe({
      next: (response) => {
        this.loading = false;
        if (response && response.payUrl) {
          window.location.href = response.payUrl;
        } else if (response && response.message) {
          this.errorMsg = response.message;
        } else {
          this.errorMsg = 'Không nhận được link thanh toán từ server.';
          console.error('Invalid response from server:', response);
        }
      },
      error: (err) => {
        this.loading = false;
        const msg = err?.error?.message || err?.message;
        this.errorMsg = msg || 'Lỗi kết nối thanh toán. Vui lòng thử lại.';
        console.error('Payment error:', err);
      }
    });
  }
}
