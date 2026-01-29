import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerService } from '../customer-service';

@Component({
  selector: 'app-listcustomers',
  standalone: false,
  templateUrl: './listcustomers.html',
  styleUrl: './listcustomers.css',
})
export class Listcustomers {
  customerGroups$: Observable<any[]>;

  constructor(private service: CustomerService) {
    this.customerGroups$ = this.service.getCustomers();
  }
}
