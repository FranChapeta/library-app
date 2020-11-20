import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-books-view',
  templateUrl: './books-view.component.html',
  styleUrls: ['./books-view.component.css']
})
export class BooksViewComponent implements OnInit {
  public books: Book[];

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks().subscribe(books => { this.books = books; } );
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe( response => {
      if (response.status == 200) {
        this.getBooks();
      }
    });
  }

}
