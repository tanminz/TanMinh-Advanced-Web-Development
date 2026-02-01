import { Component } from '@angular/core';
import { CustomerService } from '../customer-service';

@Component({
  selector: 'app-customer-3',
  standalone: false,
  templateUrl: './customer-3.html',
  styleUrl: './customer-3.css',
})
export class Customer3Component {
  customers: any;
  arr_ages: number[] = [];

  constructor(private cs: CustomerService) {
    for (let i = 20; i <= 100; i++) {
      this.arr_ages[i - 20] = i;
    }
    this.do_filter(20, 100);
  }

  do_filter(fromAge: any, toAge: any) {
    this.customers = this.cs.filter_customer_by_age(fromAge, toAge);
  }
}
