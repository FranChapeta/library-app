import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-authors-view',
  templateUrl: './authors-view.component.html',
  styleUrls: ['./authors-view.component.css']
})
export class AuthorsViewComponent implements OnInit {
  public authors: Author[];
  public loadingData: boolean;

  pageForm = new FormGroup({
    pageNumber: new FormControl( 1, [Validators.required]),
    pageSize: new FormControl('20', [Validators.required]),
    columnOrder: new FormControl('id', [Validators.required]),
    orderType: new FormControl('ASC', [Validators.required])
  });

  constructor(private authorService: AuthorService) { }

  ngOnInit() {
    this.getAuthors();
    this.pageForm.valueChanges.pipe(
      debounceTime(1000), 
      distinctUntilChanged())
      .subscribe(pageParams => {
        this.getAuthors();
      });
  }

  getAuthors() {
    this.loadingData = true;
    this.authorService.getAuthors(this.pageForm.value).subscribe(authors => {
      this.authors = authors;
      this.loadingData = false;
    });
  }

  deleteAuthor(id: number) {
    this.authorService.deleteAuthor(id).subscribe( response => {
      if(response.status == 200) {
        this.getAuthors();
      }
    })
  }

}
