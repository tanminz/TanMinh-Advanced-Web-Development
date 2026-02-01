import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { FakeProductService } from '../fake-product.service';
import { IFakeProduct } from '../interfaces/fake-product';

@Component({
  selector: 'app-fake-product-basic',
  standalone: false,
  templateUrl: './fake-product-basic.html',
})
export class FakeProductBasicComponent {
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
