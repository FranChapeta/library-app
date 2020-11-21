import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

  public getAuthors(page?: any): Observable<Author[]> {
    let order = page.columnOrder || 'id';
    let orderType = page.orderType || 'ASC';
    let pageSize = page.pageSize || 20;
    let pageNumber = page.pageNumber || 0;
    let params = new HttpParams()
      .set('order', order.toString())
      .set('orderType', orderType.toString())
      .set('pageSize', pageSize.toString())
      .set('pageNumber', pageNumber.toString());
    return this.httpService.get<Author[]>(`http://localhost:3000/authors`,{  params }).pipe(
      catchError(this.handleError<Author[]>('getAuthors', []))
    );
  }

  public newAuthor(author: Author): Observable<any> {
    return this.httpService.post<Author>(`http://localhost:3000/authors`, author, httpOptions );
  }

  public updateAuthor(id: number, author: Author): Observable<any> {
    return this.httpService.put<Author>(`http://localhost:3000/authors/${id}`, author, httpOptions );
  }

  public deleteAuthor(id: number): Observable<any> {
    return this.httpService.delete<Author>(`http://localhost:3000/authors/${id}`, httpOptions );
  }

}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }),
  observe: 'response' as const,
};