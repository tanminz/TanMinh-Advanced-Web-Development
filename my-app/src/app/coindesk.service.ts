import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IAlternativeTicker } from './interfaces/coindesk-bpi';

@Injectable({
  providedIn: 'root'
})
export class CoinDeskService {
  private url = '/v1/ticker/';

  constructor(private http: HttpClient) {}

  getCurrentPrice(): Observable<IAlternativeTicker[]> {
    return this.http.get<IAlternativeTicker[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}
