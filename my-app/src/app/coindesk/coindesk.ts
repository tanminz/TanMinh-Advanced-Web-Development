import { Component } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { CoinDeskService } from '../coindesk.service';
import { IAlternativeTicker } from '../interfaces/coindesk-bpi';

@Component({
  selector: 'app-coindesk',
  standalone: false,
  templateUrl: './coindesk.html',
  styleUrl: './coindesk.css'
})
export class CoinDeskComponent {
  tickers$: Observable<IAlternativeTicker[]>;
  errorMessage = '';
  refreshSeconds = 60;

  constructor(private service: CoinDeskService) {
    this.tickers$ = timer(0, this.refreshSeconds * 1000).pipe(
      switchMap(() => this.service.getCurrentPrice()),
      catchError((err: Error) => {
        this.errorMessage = err.message;
        return of([]);
      })
    );
  }
}
