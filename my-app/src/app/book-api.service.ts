import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { IBook } from './interfaces/book';

@Injectable({
  providedIn: 'root',
})
export class BookAPIService {
  constructor(private _http: HttpClient) {}

  getBooks(): Observable<IBook[]> {
    return this._http.get<IBook[]>('/books').pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getBook(bookId: string): Observable<IBook> {
    return this._http.get<IBook>(`/books/${bookId}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  postBook(aBook: any): Observable<any> {
    return this._http.post<any>('/books', aBook).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  updateBook(id: string, book: any) {
    return this._http.put(`/books/${id}`, book);
  }

  deleteBook(id: string) {
    return this._http.delete<any>(`/books/${id}`);
  }

  renameBook(oldId: string, book: any) {
    return this._http.put<any>(`/books/rename/${oldId}`, book);
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}
