import { Component } from '@angular/core';
import { CustomerService } from '../customer-service';

@Component({
  selector: 'app-customer-2',
  standalone: false,
  templateUrl: './customer-2.html',
  styleUrl: './customer-2.css',
})
export class Customer2Component {
  customers: any[];

  constructor(private customerService: CustomerService) {
    this.customers = this.customerService.get_all_customers();
  }
}
