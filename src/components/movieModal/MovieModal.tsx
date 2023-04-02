import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IMovie } from "../../models/IMovie";
import { movieDetails } from "../../services/movieSearch";
import "./MovieModal.scss";
import { IMovieDetails } from "../../models/IMovieDetails";

export const MovieModal = () => {
  const [selectedMovie, setSelectedMovie] = useState<IMovieDetails>();
  const { id: urlId = "" } = useParams<{ id: string }>();
  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (urlId) {
        const response = await movieDetails(urlId);
        setSelectedMovie(response);
      }
    };
    fetchMovieDetails();
  }, [urlId]);
  return (
    <>
      <div className="selectedMovieWrapper">
        <Link to={"/"}>
          <div className="returnbutton">
            <i className="fa-solid fa-arrow-left"></i>
          </div>
        </Link>
        <h3 className="selectedMovieTitle">{selectedMovie?.Title}</h3>
        <div className="underlineTitle">
          <div className="underline"></div>
        </div>
        <div className="selectedMovieImageContainer">
          <div className="typeruntimecontainer">
            <div className="typecontainer">
              <p className="type">Type: {selectedMovie?.Type}</p>
            </div>
            <div className="runtimeContainer">
              <p className="runtime">Runtime: {selectedMovie?.Runtime}</p>
            </div>
          </div>
          <img className="selectedMovieImage" src={selectedMovie?.Poster}></img>
          <div className="awardsandBoxOffice">
            <div className="awards">
              <p className="awardsandBoxOfficeTitle"> Awards:</p>
              <p>{selectedMovie?.Awards}</p>
            </div>
            <div className="boxOffice">
              <p className="awardsandBoxOfficeTitle">BoxOffice:</p>
              <p> {selectedMovie?.BoxOffice}</p>
            </div>
          </div>
        </div>

        <div className="selectedMovieInformation">
          <div className="ReleasedAndGenreContainer">
            <div className="selectedMovieInformationReleased">
              <p className="releasedTitle">Released:</p>
              <p>{selectedMovie?.Released}</p>
            </div>
            <div className="selectedMovieInformationGenre">
              <p className="genreTitle">Genre:</p>
              <p>{selectedMovie?.Genre}</p>
            </div>
          </div>
          <p className="selectedMovieInformationPlot">
            "{selectedMovie?.Plot}"
          </p>
          <div className="DirectorAndActorsContainer">
            <div className="selectedMovieDirector">
              <p className="directorTitle"> Director:</p>
              <p>{selectedMovie?.Director}</p>
            </div>
            <div className="selectedMovieActors">
              <p className="actorsTitle">Actors:</p>
              <p>{selectedMovie?.Actors}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="ratings">
        <h4 className="ratingsTitle">Ratings:</h4>
        <div className="underlineTitle">
          <div className="underline"></div>
        </div>
        <>
          {selectedMovie?.Ratings.map((rating, i) => (
            <ul className="ratingContainer">
              <li className="ratingstitle">
                {selectedMovie?.Ratings[i].Source}
              </li>
              <li>
                <em>{selectedMovie?.Ratings[i].Value}</em>
              </li>
            </ul>
          ))}
        </>
      </div>
    </>
  );
};
