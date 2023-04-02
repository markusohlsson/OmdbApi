import axios from "axios";
import { IMovieDetails } from "../models/IMovieDetails";
import { IMovie, IOmdbResponse } from "../models/IMovie";

export async function movieSearch(searchText: string): Promise<IOmdbResponse> {
  let response = await axios.get<IOmdbResponse>(
    `http://www.omdbapi.com/?s=${searchText}&apikey=74f13706`
  );
  console.log(response.data);
  return response.data;
}

export async function movieSearchByPage(
  searchText: string,
  pageNumber: string
): Promise<IOmdbResponse> {
  const response = await axios.get<IOmdbResponse>(
    `http://www.omdbapi.com/?s=${searchText}&apikey=74f13706&page=${pageNumber}`
  );
  return response.data;
}

export async function movieDetails(ImdbID: string): Promise<IMovieDetails> {
  const response = await axios.get<IMovieDetails>(
    `http://www.omdbapi.com/?i=${ImdbID}&plot=full&apikey=74f13706`
  );
  console.log(response.data);
  return response.data;
}
