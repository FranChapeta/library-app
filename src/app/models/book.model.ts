import { Author } from './author.model';
import {Deserializable} from './deserializable.model';

export class Book implements Deserializable {
  public id: number;
  public name: string;
  public description: string;
  public cover: string;
  public release_date: Date;
  public languages: string[];
  public authors: Author[];

  deserialize(input: any): this {
    Object.assign(this, input);
    this.authors = input.authors.map(author => new Author().deserialize(author));
    return this;
  }
  
}