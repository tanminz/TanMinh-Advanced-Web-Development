import { Component } from '@angular/core';
import { CustomerService } from '../customer-service/customer-service';

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer {
  customers: any[];

  constructor(private customerService: CustomerService) {
    this.customers = this.customerService.getCustomers();
  }
}
