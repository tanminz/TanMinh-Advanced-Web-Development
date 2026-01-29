import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customers = [
    { id: 1, name: 'John Doe', age: 30, picture: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcR3Zj8CyPwQ0hiqqRYUekC-587kLjgy1H7EejB6X0MTmFGvphQjYFYrwZ7hk1FDaMaIB5y4GIYSye0Wck1FdrTnJruPywYMWUon1UY4voLcWUconG3qz4RjlRSxRntjGJS-n9pKaY6im3jI&s=19' },
    { id: 2, name: 'Jane Smith', age: 25, picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-9VGIStm9PwFb_mi97OWtMFlQ5HHE0ROkSQP9WTu_RMc1hhEvK3MsTEb3iRn7-47eNf4GQJJxGHyfQqh3f6boDY_gcZMxQAWQdgFxPd4NZQ&s=10' },
    { id: 3, name: 'Bob Johnson', age: 35, picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSinP5HUWIQYlc_1hxtFW2ppwpPghfq0RxkbisBMtQZMlXMNUbinSaWobnsj9JlFwX4p-5Hye4ZIlwHiyUWa3ZV5lSQO9dtYeaVoGxcnveE&s=10' },
    { id: 4, name: 'obama', age: 45, picture: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTxpigd7j7jgeH0gtsQAf9Sn54vTVz0bV3epiWgeowWL7yHrrIX3WGVRTS1boONHX_zsyzb6YIHIH18VWunVxQ9Mk_EKrLa4WRyDftYgrgA30r9Rhq4-2y78LWjj0M5htMK8lwNW1RDV6Fp&s=19' }
  ];

  constructor(private http: HttpClient) {}

  /** Load danh sách nhóm khách hàng từ assets/data/customers.json (Exercise 14 - HTTP service) */
  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>('assets/data/customers.json');
  }

  filter_customer_by_age(fromAge: number, toAge: number): any[] {
    return this.customers.filter((c: { age: number }) => c.age >= fromAge && c.age <= toAge);
  }
}
