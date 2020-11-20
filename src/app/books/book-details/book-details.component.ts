import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
              private route: ActivatedRoute,
              private router: Router) {
                
              }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.bookService.getBookDetails(params['id'])
        .subscribe(book => {
          this.book = book;
          this.book.release_date = book.release_date ? book.release_date.split("T")[0] : 'Sin-Fecha';
        });
    });
    
  }

  deleteBook() {
    this.bookService.deleteBook(this.book.id).subscribe( response => {
      if (response.status == 200) {
        this.router.navigate(["/books"]);
      }
    })
  }

}
