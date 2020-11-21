import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-books-view',
  templateUrl: './books-view.component.html',
  styleUrls: ['./books-view.component.css']
})
export class BooksViewComponent implements OnInit {
  public books: Book[];
  public loadingData: boolean;

  pageForm = new FormGroup({
    pageNumber: new FormControl( 1, [Validators.required]),
    pageSize: new FormControl('20', [Validators.required]),
    columnOrder: new FormControl('id', [Validators.required]),
    orderType: new FormControl('ASC', [Validators.required])
  });

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getBooks();
    this.pageForm.valueChanges.pipe(
      debounceTime(1000), 
      distinctUntilChanged())
      .subscribe(pageParams => {
        this.getBooks();
      });
  }

  getBooks() {
    this.loadingData = true;
    this.bookService.getBooks(this.pageForm.value).subscribe(books => {
      this.books = books;
      this.loadingData = false;
    });
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe( response => {
      if (response.status == 200) {
        this.getBooks();
      }
    });
  }

}
