export interface IMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
  Type: string;
}

export interface IOmdbResponse {
  Search: IMovie[];
  totalResults: number;
}
