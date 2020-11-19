import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { Book } from '../models/book.model';
import { Author } from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private httpService: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public getAuthorDetails(id: number): Observable<Author> {
    return this.httpService.get<Author>(`http://localhost:3000/authors/${id}`).pipe(
      catchError(this.handleError<Author>(`getAuthor id=${id}`))
    );
  }

  public getAuthors(order: string = 'id', orderType: string = 'DESC', pageSize: number = 20, pageNumber: number = 0): Observable<Author[]> {
    let params = new HttpParams()
      .set('order', order.toString())
      .set('orderType', orderType.toString())
      .set('pageSize', pageSize.toString())
      .set('pageNumber', pageNumber.toString());
    return this.httpService.get<Author[]>(`http://localhost:3000/authors`,{  params }).pipe(
      catchError(this.handleError<Author[]>('getAuthors', []))
    );
  }

  public newAuthor(author: Author): Observable<HttpResponse<{}>> {
    return this.httpService.post<Author>(`http://localhost:3000/authors`, author, { observe: 'response' });
  }

  public updateAuthor(id: number, author: Author): Observable<HttpResponse<{}>> {
    return this.httpService.put<Author>(`http://localhost:3000/authors/${id}`, author, { observe: 'response' });
  }

  public deleteAuthor(id: number): Observable<HttpResponse<{}>> {
    return this.httpService.delete<Author>(`http://localhost:3000/authors/${id}`, { observe: 'response' });
  }

}
