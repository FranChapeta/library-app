import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  book: Book;
  editMode: boolean;
  bookForm: FormGroup;
  authorsForm: FormArray;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private bookService: BookService) {
    
    this.bookForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      cover: new FormControl(''),
      release_date: new FormControl(''),
      languages: new FormControl('')
    });
    this.authorsForm = new FormArray([]);
  }

  addAuthor() {
    this.authorsForm.push(new FormControl(''));
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if(params.get('id')) {
        let id = +params.get('id');

        if (!isNaN(id)) {
          this.editMode = true;
          
          this.bookService.getBookDetails(id)
            .subscribe(book => { this.book = book; console.log(book) }
          );
        } else {
          this.router.navigate(['/books']);
        }

      } else {
        this.editMode = false;
      }
      

      
      
    });
  }

}
