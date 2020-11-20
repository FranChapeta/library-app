import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { Book } from '../models/book.model';
import { Author } from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpService: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public getBookDetails(id: number): Observable<Book> {
    return this.httpService.get<Book>(`http://localhost:3000/books/${id}`).pipe(
      catchError(this.handleError<Book>(`getBook id=${id}`))
    );
  }

  public getBooks(order: string = 'id', orderType: string = 'DESC', pageSize: number = 20, pageNumber: number = 0): Observable<Book[]> {
    let params = new HttpParams()
      .set('order', order.toString())
      .set('orderType', orderType.toString())
      .set('pageSize', pageSize.toString())
      .set('pageNumber', pageNumber.toString());
    return this.httpService.get<Book[]>(`http://localhost:3000/books`,{  params }).pipe(
      catchError(this.handleError<Book[]>('getBooks', []))
    );
  }

  public newBook(book: Book): Observable<any> {
    return this.httpService.post<Book>(`http://localhost:3000/books`, book, httpOptions);
  }

  public updateBook(id: number, book: Book): Observable<any> {
    return this.httpService.put<Book>(`http://localhost:3000/books/${id}`, book, httpOptions);
  }

  public deleteBook(id: number): Observable<any> {
    return this.httpService.delete<Book>(`http://localhost:3000/books/${id}`, httpOptions);
  }

  public deleteBookAuthor(id: number, authorId: number): Observable<any> {
    return this.httpService.delete<Book>(`http://localhost:3000/books/${id}/authors/${authorId}/`, httpOptions);
  }
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }),
  observe: 'response' as const,
};