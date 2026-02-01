import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IFakeProduct } from './interfaces/fake-product';

@Injectable({
  providedIn: 'root'
})
export class FakeProductService {
  private url = '/products';

  constructor(private http: HttpClient) {}

  getFakeProductData(): Observable<IFakeProduct[]> {
    return this.http.get<IFakeProduct[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}
