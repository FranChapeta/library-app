import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private httpService: HttpClient) { }

  public getBookDetails(id: number): Observable<Book> {
    return this.httpService.get<Book>(`http://localhost:3000/books/${id}`).pipe(
      map(data => new Book().deserialize(data)),
      catchError(() => throwError('User not found'))
    );
  }

  public getBooks(): Observable<Book[]> {
    return this.httpService.get<Book[]>(`http://localhost:3000/books`).pipe(
      map(data => data.map(data => new Book().deserialize(data)))
    );
  }



}
