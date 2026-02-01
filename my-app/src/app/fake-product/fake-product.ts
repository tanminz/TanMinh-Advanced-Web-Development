import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { FakeProductService } from '../fake-product.service';
import { IFakeProduct } from '../interfaces/fake-product';

@Component({
  selector: 'app-fake-product',
  standalone: false,
  templateUrl: './fake-product.html',
  styleUrl: './fake-product.css'
})
export class FakeProductComponent {
  products$: Observable<IFakeProduct[]>;
  errorMessage = '';

  constructor(private service: FakeProductService) {
    this.products$ = this.service.getFakeProductData().pipe(
      catchError((err: Error) => {
        this.errorMessage = err.message;
        return of([]);
      })
    );
  }
}
