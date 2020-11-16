import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksComponent } from './books/books.component';
import { BooksViewComponent } from './books/books-view/books-view.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';

import { AuthorsComponent } from './authors/authors.component';
import { AuthorsViewComponent } from './authors/authors-view/authors-view.component';
import { AuthorDetailsComponent } from './authors/author-details/author-details.component';
import { AuthorEditComponent } from './authors/author-edit/author-edit.component';


const routes: Routes = [
  {path: '', component: BooksViewComponent },
  {path: 'books', component: BooksComponent, children: [
    { path: '', component: BooksViewComponent },
    { path: 'new', component: BookEditComponent },
    { path: ':id', component: BookDetailsComponent },
    { path: ':id/edit', component: BookEditComponent }
  ] },
  {path: 'authors', component: AuthorsComponent, children: [
    { path: '', component: AuthorsViewComponent },
    { path: 'new', component: AuthorEditComponent },
    { path: ':id', component: AuthorDetailsComponent },
    { path: ':id/edit', component: AuthorEditComponent }
  ] },
  {path: '**', redirectTo: 'books'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
