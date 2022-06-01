import {IMovie} from "./IMovie";

export class Movie implements IMovie{
  Title: string;
  Year: string;
  imdbID: string;

  constructor(Title: string, Year: string, imdbID: string) {
    this.Title = Title;
    this.Year = Year;
    this.imdbID = imdbID
  }
}
