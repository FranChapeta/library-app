import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BooksComponent } from './books/books.component';
import { BooksViewComponent } from './books/books-view/books-view.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';

import { AuthorsComponent } from './authors/authors.component';
import { AuthorsViewComponent } from './authors/authors-view/authors-view.component';
import { AuthorEditComponent } from './authors/author-edit/author-edit.component';
import { AuthorDetailsComponent } from './authors/author-details/author-details.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    AppComponent,
    BooksViewComponent,
    BookDetailsComponent,
    BookEditComponent,
    AuthorsViewComponent,
    AuthorEditComponent,
    AuthorDetailsComponent,
    BooksComponent,
    AuthorsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
