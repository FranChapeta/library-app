import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book;

  constructor(private bookService: BookService,
              private route: ActivatedRoute) {
                
              }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.bookService.getBookDetails(params['id'])
        .subscribe(book => { this.book = book; console.log(book) } );
    });
    
  }

}
