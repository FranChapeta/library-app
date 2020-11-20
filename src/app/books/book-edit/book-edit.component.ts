import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Author } from 'src/app/models/author.model';
import { Book } from 'src/app/models/book.model';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})

export class BookEditComponent implements OnInit {
  book: Book;
  authors: Author[];
  editedBook: Book;
  editMode: boolean;
  enableForm: boolean = false;

  bookForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    cover: new FormControl(''),
    release_date: new FormControl(''),
    languages: new FormControl(''),
    authors: new FormArray([], [this.repeatedValues.bind(this)])
  });
  authorsForm = this.bookForm.get('authors') as FormArray;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private bookService: BookService,
              private authorService: AuthorService) { }

  repeatedValues(arr: FormArray) {
    return new Set(arr.value.map(item => item.id)).size !== arr.value.length ? {
      invalidSize: true
    } : null;
  }
  
  validateSize(arr: FormArray) {
    return arr.length < 2 ? {
      invalidSize: true
    } : null;
  }

  ngOnInit(): void {
    this.authorService.getAuthors()
      .subscribe(authors => { this.authors = authors })
    this.route.paramMap.subscribe((params: ParamMap) => {
      if(params.get('id')) {
        let id = +params.get('id');

        if (!isNaN(id)) {
          this.editMode = true;
          this.authorsForm.clearValidators;
          this.authorsForm.updateValueAndValidity;
          
          this.bookService.getBookDetails(id)
            .subscribe(book => {
              this.book = book;
              this.updateBookForm(book);
              this.enableForm = true;
            });
        } else {
          this.router.navigate(['/books']);
        }

      } else {
        this.editMode = false;
        this.authorsForm.setValidators(this.validateSize.bind(this));
        this.authorsForm.updateValueAndValidity;
        this.enableForm = true;
      }

    });
  }

  addAuthor() {
    this.authorsForm.push(new FormControl('', Validators.required));
  }

  removeAuthor(index: number) {
    this.authorsForm.removeAt(index);
  }

  updateBookForm(book: Book) {
    this.bookForm.patchValue({
      name: book.name,
      description: book.description,
      release_date: book.release_date,
      languages: book.languages,
      cover: book.cover
    });
  }

  newBook() {
    let book = new Book;
    book.authors = [];
    book.name = this.bookForm.get('name').value
    book.description = this.bookForm.get('description').value
    book.release_date = this.bookForm.get('release_date').value
    book.languages = this.bookForm.get('languages').value
    book.cover = this.bookForm.get('cover').value
    for (let author of this.authorsForm.value) {
      book.authors.push(author);
    };
    if(this.editMode) {
      this.bookService.updateBook(this.book.id, book).subscribe(response => {
        if (response.status == 200) {
          this.router.navigate(['/books', this.book.id]);
        }
      })
    } else {
      this.bookService.newBook(book).subscribe(response => { 
        if (response.body.insertId) {
          this.router.navigate(['/authors', response.body.insertId]);
        }
      });
    }
  }

  deleteBookAuthor(authorId: number) {
    this.bookService.deleteBookAuthor(this.book.id,authorId).subscribe(response => {
      if (response.status == 200) {
        this.bookService.getBookDetails(this.book.id)
            .subscribe(book => { this.book.authors = book.authors }
          );
      }
    });
  }

}

