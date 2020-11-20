import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {
  author: Author;
  editMode: boolean;
  enableForm: boolean = false;

  authorForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    birth_date: new FormControl('', [Validators.required]),
    country: new FormControl('')
  });

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authorService: AuthorService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if(params.get('id')) {
        let id = +params.get('id');

        if (!isNaN(id)) {
          this.editMode = true;
          
          this.authorService.getAuthorDetails(id)
            .subscribe(author => {
              this.author = author;
              this.author.birth_date = author.birth_date.split("T")[0];
              this.updateAuthorForm(author);
              this.enableForm = true;
            }
          );
        } else {
          this.router.navigate(['/authors']);
        }

      } else {
        this.editMode = false;
        this.enableForm = true;
      }

    });
  }

  updateAuthorForm(author: Author) {
    this.authorForm.patchValue({
      name: author.name,
      birth_date: author.birth_date,
      country: author.country
    });
  }

  sendAuthor() {
    let author = new Author;
    author.name = this.authorForm.get('name').value
    author.birth_date = this.authorForm.get('birth_date').value
    author.country = this.authorForm.get('country').value
    if(this.editMode) {
      this.authorService.updateAuthor(this.author.id, author).subscribe(response => { 
        if (response.status == 200) {
          this.router.navigate(['/authors', this.author.id]);
        }
      });
    } else {
      this.authorService.newAuthor(author).subscribe(response => { 
        if (response.body.insertId) {
          this.router.navigate(['/authors', response.body.insertId]);
        }
      });
    }
  }

}
