import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment-history',
  standalone: false,
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent {
  payments: any[] = [];
  loading = false;
  error = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadPayments();
  }

  loadPayments() {
    this.loading = true;
    this.error = '';
    this.http.get<any>('/payments').subscribe({
      next: (data) => {
        const list = Array.isArray(data) ? data : (data?.data && Array.isArray(data.data) ? data.data : []);
        this.payments = list;
        if (!Array.isArray(data) && list.length === 0 && data && typeof data === 'object') {
          this.error = 'API trả về định dạng không đúng. Kiểm tra backend (my server) chạy port 3000.';
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = err?.error?.message || err?.message || 'Không tải được lịch sử. Kiểm tra server (port 3000) và MongoDB.';
        this.payments = [];
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
