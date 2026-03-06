import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BookAPIService } from '../book-api.service';
import { IBook } from '../interfaces/book';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class BooksComponent {
  books$: Observable<IBook[]>;
  errMessage = '';

  constructor(private _service: BookAPIService) {
    this.books$ = this._service.getBooks().pipe(
      catchError((err: Error) => {
        this.errMessage = err.message;
        return of([]);
      })
    );
  }
}
