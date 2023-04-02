export interface IMovieDetails {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  DVD: string;
  Director: string;
  Genre: string;
  Plot: String;
  Poster: string;
  Ratings: IRatings[];
  Released: string;
  Runtime: string;
  Title: String;
  Type: string;
  imdbRating: string;
  imdbId: string;
  imdbVotes: string;
}
interface IRatings {
  Source: string;
  Value: String;
}
