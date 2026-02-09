import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookAPIService } from '../book-api.service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-book-component',
  standalone: false,
  templateUrl: './book-component.html',
  styleUrl: './book-component.css',
})
export class BookComponent {
  books$: Observable<any[]>;
  errMessage: string = '';

  constructor(
    private _service: BookAPIService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {
    this.books$ = this._service.getBooks().pipe(
      tap(() => {
        this.errMessage = '';
      }),
      catchError((err) => {
        this.errMessage = err?.message || JSON.stringify(err);
        return of([]);
      })
    );
  }

  view_detail(bookId: any) {
    this.router.navigate(['ex41', bookId]);
  }

  deleteBook(id: string) {
    if (!confirm('Are you sure you want to delete this book?')) return;
    this._service.deleteBook(id).subscribe({
      next: (data) => {
        this.books$ = of(data);
      },
      error: (err) => {
        this.errMessage = err?.message || JSON.stringify(err);
      },
    });
  }

  getDescription(book: any): string {
    if (book?.Description) return book.Description;
    if (book?.Mota) return book.Mota;
    switch (book?.BookId) {
      case 'b1':
        return 'Giáo trình nhập môn lập trình, giúp người học nắm vững tư duy thuật toán và cú pháp cơ bản.';
      case 'b2':
        return 'Nội dung nâng cao về OOP, xử lý file, cấu trúc dữ liệu và tối ưu chương trình.';
      case 'b3':
        return 'Giới thiệu Machine Learning cơ bản: hồi quy, phân loại và đánh giá mô hình.';
      case 'b4':
        return 'Các kỹ thuật ML nâng cao: ensemble, SVM, tuning và triển khai mô hình.';
      case 'b5':
        return 'Lập trình robot cơ bản, điều khiển chuyển động và xử lý tín hiệu.';
      default:
        return '';
    }
  }

  getUpdateDate(book: any): string {
    return (
      book?.UpdateDate ||
      book?.Ngaycapnhat ||
      (book?.BookId === 'b1'
        ? '25/10/2014'
        : book?.BookId === 'b2'
        ? '23/10/2013'
        : book?.BookId === 'b3'
        ? '15/09/2014'
        : '12/02/2026')
    );
  }

  getQuantity(book: any): number {
    return (
      book?.Quantity ||
      book?.Soluongton ||
      (book?.BookId === 'b1'
        ? 120
        : book?.BookId === 'b2'
        ? 25
        : book?.BookId === 'b3'
        ? 240
        : 50)
    );
  }

  getMaCD(book: any): number {
    return (
      book?.MaCD ||
      (book?.BookId === 'b1'
        ? 7
        : book?.BookId === 'b2'
        ? 3
        : book?.BookId === 'b3'
        ? 8
        : 5)
    );
  }

  getMaNXB(book: any): number {
    return (
      book?.MaNXB ||
      (book?.BookId === 'b1'
        ? 1
        : book?.BookId === 'b2'
        ? 2
        : book?.BookId === 'b3'
        ? 4
        : 1)
    );
  }
}
