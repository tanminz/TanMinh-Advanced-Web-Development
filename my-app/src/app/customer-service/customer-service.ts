import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-service',
  standalone: false,
  templateUrl: './customer-service.html',
  styleUrl: './customer-service.css',
})
export class CustomerService {
  customers = [
    { id: 1, name: 'John Doe', age: 30, picture: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcR3Zj8CyPwQ0hiqqRYUekC-587kLjgy1H7EejB6X0MTmFGvphQjYFYrwZ7hk1FDaMaIB5y4GIYSye0Wck1FdrTnJruPywYMWUon1UY4voLcWUconG3qz4RjlRSxRntjGJS-n9pKaY6im3jI&s=19' },
    { id: 2, name: 'Jane Smith', age: 25, picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-9VGIStm9PwFb_mi97OWtMFlQ5HHE0ROkSQP9WTu_RMc1hhEvK3MsTEb3iRn7-47eNf4GQJJxGHyfQqh3f6boDY_gcZMxQAWQdgFxPd4NZQ&s=10' },
    { id: 3, name: 'Bob Johnson', age: 35, picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-9VGIStm9PwFb_mi97OWtMFlQ5HHE0ROkSQP9WTu_RMc1hhEvK3MsTEb3iRn7-47eNf4GQJJxGHyfQqh3f6boDY_gcZMxQAWQdgFxPd4NZQ&s=10' },
    { id: 4, name: 'obama', age: 45, picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-9VGIStm9PwFb_mi97OWtMFlQ5HHE0ROkSQP9WTu_RMc1hhEvK3MsTEb3iRn7-47eNf4GQJJxGHyfQqh3f6boDY_gcZMxQAWQdgFxPd4NZQ&s=10' }
  ];
  
  constructor() {
  }

  getCustomers() {
    return this.customers;
  }
}
