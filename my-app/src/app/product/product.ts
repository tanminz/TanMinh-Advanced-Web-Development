import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class ProductComponent {
  products = [
    {
      id: 'p1',
      name: 'Coca',
      price: 15,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3M-xR4PTf-oldWP8s2UWBCDxtZatNqXs1NA&s',
    },
    {
      id: 'p2',
      name: 'Pepsi',
      price: -14,
      image:
        'https://minhcaumart.vn//media/com_eshop/products/resized/8934588012228%201-500x500.webp',
    },
    {
      id: 'p3',
      name: 'Sting',
      price: 16,
      image:
        'https://product.hstatic.net/200000460455/product/sting_dau_sleek_lon__320ml__7ea37f02dff64103ae8121a3f9b193c0_master.jpg',
    },
    {
      id: 'p4',
      name: '7UP',
      price: -15,
      image:
        'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/2443/76444/bhx/7up-pet-390ml_202509050854517988.jpg',
    },
    {
      id: 'p5',
      name: 'Lavie',
      price: 20,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoQS6FZWF8Rorek3nFyJAdOOY6luAc6RbSQg&s',
    },
  ];
  selected_id: string | null = null;

  constructor(private router: Router, private activeRouter: ActivatedRoute) {
    this.activeRouter.paramMap.subscribe((param) => {
      this.selected_id = param.get('id');
    });
  }

  view_detail(pid: string) {
    this.router.navigate(['/san-pham-1', pid]);
  }
}
