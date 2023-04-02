import { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import { IOmdbResponse } from "../../models/IMovie";
import { movieDetails, movieSearchByPage } from "../../services/movieSearch";
import { MovieModal } from "../movieModal/MovieModal";

interface MovieSearchResultsProps {
  searchMovie: IOmdbResponse | undefined;
  searchText: string;
}

export const MovieSearchResult = ({
  searchMovie,
  searchText,
}: MovieSearchResultsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState(searchMovie?.Search || []);

  useEffect(() => {
    setSearchResults(searchMovie?.Search || []);
    setCurrentPage(1);
  }, [searchMovie]);

  const numPages = Math.ceil((searchMovie?.totalResults || 0) / 10);
  const startIndex = (currentPage - 1) * 10;

  const handlePageClick = (pageNumber: number) => {
    movieSearchByPage(searchText, JSON.stringify(pageNumber)).then(
      (response) => {
        setSearchResults(response.Search || []);
        setCurrentPage(pageNumber);
      }
    );
  };

  const openModal = (id: string) => {
    // push the desired URL to the history
    window.location.href = `/${id}`;
  };

  // Calculate the start and end index of the page range to be displayed
  const rangeSize = 5;
  const rangeStart = Math.max(currentPage - Math.floor(rangeSize / 2), 1);
  const rangeEnd = Math.min(rangeStart + rangeSize - 1, numPages);

  return (
    <div className="ResponseContainer" id="response">
      {searchMovie?.Search?.length ? (
        <>
          <h3 className="responseContainerTitle">Result:</h3>
          {searchResults?.map((movie) => (
            <div
              key={movie.imdbID}
              className="responseMovie"
              onClick={() => {
                openModal(movie.imdbID);
              }}
            >
              <div>
                <h3 className="responseTitle">{movie.Title}</h3>
                <p className="responseYear">{movie.Year}</p>
                <div className="responseImageContainer">
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="responseImage"
                  />
                </div>
                <p>{movie.Type}</p>
                <Link
                  to={`https://www.imdb.com/title/${movie.imdbID}`}
                  target={"_blank"}
                  className="responseImdbIdLink"
                >
                  <div className="showOnIMDB">Show on IMDB</div>
                </Link>
              </div>
            </div>
          ))}
          <div className="pagination">
            {/* "First" button */}
            {rangeStart > 1 && (
              <button onClick={() => handlePageClick(1)}>{"<<"}</button>
            )}
            {/* "Previous" button */}
            {rangeStart > 1 && (
              <button onClick={() => handlePageClick(currentPage - rangeSize)}>
                {"<"}
              </button>
            )}
            {/* Numbered buttons */}
            {Array.from({ length: rangeEnd - rangeStart + 1 }).map((_, i) => (
              <button
                key={i + rangeStart}
                onClick={() => handlePageClick(i + rangeStart)}
                disabled={i + rangeStart === currentPage}
              >
                {i + rangeStart}
              </button>
            ))}
            {/* "Next" button */}
            {rangeEnd < numPages && (
              <button onClick={() => handlePageClick(currentPage + rangeSize)}>
                {">"}
              </button>
            )}
            {/* "Last" button */}
            {rangeEnd < numPages && (
              <button onClick={() => handlePageClick(numPages)}>{">>"}</button>
            )}
          </div>
        </>
      ) : (
        searchMovie && (
          <div>
            <p className="noresult">No Result</p>
            <p className="noresult"> Enter a new searchterm</p>
          </div>
        )
      )}
      <div className="totalResults">
        Total results: {searchMovie?.totalResults}
      </div>
    </div>
  );
};
