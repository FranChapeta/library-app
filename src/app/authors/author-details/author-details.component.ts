import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit {
  author: Author;

  constructor(private authorService: AuthorService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.authorService.getAuthorDetails(params['id'])
        .subscribe(author => {
          this.author = author;
        }
      );
    });
  }

  deleteAuthor() {
    this.authorService.deleteAuthor(this.author.id).subscribe( response => {
      if(response.status == 200) {
        this.router.navigate(['/authors']);
      }
    })
  }

}
