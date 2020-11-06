import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksViewComponent } from './books-view/books-view.component';
import { BookDetailsComponent } from './books-view/book-details/book-details.component';
import { BookEditComponent } from './books-view/book-edit/book-edit.component';
import { AuthorsViewComponent } from './authors-view/authors-view.component';
import { AuthorEditComponent } from './authors-view/author-edit/author-edit.component';
import { AuthorDetailsComponent } from './authors-view/author-details/author-details.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksViewComponent,
    BookDetailsComponent,
    BookEditComponent,
    AuthorsViewComponent,
    AuthorEditComponent,
    AuthorDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
