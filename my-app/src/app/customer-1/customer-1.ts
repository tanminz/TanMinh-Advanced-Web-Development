import { Component } from '@angular/core';
import { CustomerService } from '../customer-service';

@Component({
  selector: 'app-customer-1',
  standalone: false,
  templateUrl: './customer-1.html',
  styleUrl: './customer-1.css',
})
export class Customer1Component {
  customers: any[];

  constructor(private customerService: CustomerService) {
    this.customers = this.customerService.get_all_customers();
  }
}
