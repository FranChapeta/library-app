import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-authors-view',
  templateUrl: './authors-view.component.html',
  styleUrls: ['./authors-view.component.css']
})
export class AuthorsViewComponent implements OnInit {
  public authors: Author[];

  constructor(private authorService: AuthorService) { }

  ngOnInit() {
    this.authorService.getAuthors().subscribe(authors => { this.authors = authors } );
  }

  deleteAuthor(id: number) {
    this.authorService.deleteAuthor(id).subscribe( response => {
      if(response.status == 200) {
        this.authorService.getAuthors().subscribe(authors => { this.authors = authors } );
      }
    })
  }

}
