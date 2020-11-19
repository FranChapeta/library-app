import { Author } from './author.model';
import {Deserializable} from './deserializable.model';

export class Book {
  public id: number;
  public name: string;
  public description: string;
  public cover: string;
  public release_date: string;
  public languages: string[];
  public authors: Author[];
  
}