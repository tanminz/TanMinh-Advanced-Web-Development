import { Component } from '@angular/core';
import { CustomerService } from '../customer-service/customer-service';

@Component({
  selector: 'app-listcustomer2',
  standalone: false,
  templateUrl: './listcustomer2.html',
  styleUrl: './listcustomer2.css',
})
export class Listcustomer2 {
  customers: any[];

  constructor(private customerService: CustomerService) {
    this.customers = this.customerService.getCustomers();
  }
}
