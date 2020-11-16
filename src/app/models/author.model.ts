import {Deserializable} from './deserializable.model';

export class Author implements Deserializable {
  public id: number;
  public name: string;
  public birth_date: Date;
  public country: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }

}