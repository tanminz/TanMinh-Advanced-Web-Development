import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment-result',
  standalone: false,
  templateUrl: './payment-result.component.html',
  styleUrls: ['./payment-result.component.css']
})
export class PaymentResultComponent implements OnInit {
  resultCode: string | null = null;
  message: string | null = null;
  orderId: string | null = null;
  amount: string | null = null;
  isSuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.resultCode = params['resultCode'];
      this.message = params['message'];
      this.orderId = params['orderId'];
      this.amount = params['amount'];
      this.isSuccess = this.resultCode === '0';
      if (this.orderId && this.resultCode != null) {
        this.http.get('http://localhost:3000/payment/result', {
          params: { orderId: this.orderId, resultCode: this.resultCode }
        }).subscribe();
      }
    });
  }

  goBackToHome(): void {
    this.router.navigate(['/']);
  }
}
