import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IMovie, IOmdbResponse } from "../../models/IMovie";
import { movieSearch } from "../../services/movieSearch";
import { MovieSearchResult } from "../MovieSearchResult/MovieSearchResult";
import "./moviesearch.scss";

export const MovieSearch = () => {
  const [searchMovie, setSearchMovie] = useState<IOmdbResponse | undefined>();
  const [searchText, setSearchText] = useState("");
  const movieSearchResultRef = useRef<HTMLDivElement>(null);

  //Prevent default for form submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    try {
      const searchResult = await movieSearch(searchText);
      setSearchMovie({
        Search: searchResult.Search,
        totalResults: searchResult.totalResults,
      });
    } catch (error) {
      console.log(error);
      setSearchMovie({ Search: [], totalResults: 0 });
    }
  };
  // Update Search value for API
  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    if (searchMovie && movieSearchResultRef.current) {
      movieSearchResultRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [searchMovie]);

  return (
    <div id="home">
      <div className="hero">
        <div className="heroContent">
          <h3 className="heroText">Search on OMDB</h3>
          <form id="searchForm" onSubmit={handleSubmit}>
            <input
              type="text"
              id="searchText"
              onChange={handleSearchTextChange}
              placeholder="search"
              minLength={3}
            />
            <button className="searchButton" disabled={searchText.length < 3}>
              Search
            </button>
          </form>
          {searchText.length < 3 ? (
            <div className="helptext">Search must be atleast 3 characters</div>
          ) : null}
        </div>
      </div>
      <div ref={movieSearchResultRef}>
        {searchMovie && (
          <MovieSearchResult
            searchMovie={searchMovie}
            searchText={searchText}
          />
        )}
      </div>
      <div className="custom-shape-divider-bottom-1679680857">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
  );
};
