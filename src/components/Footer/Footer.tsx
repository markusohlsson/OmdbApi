import { Link } from "react-router-dom";
import "./footer.scss";
export const Footer = () => {
  return (
    <footer>
      <div className="leftFooter">
        <p>Created using OMDB API</p>
        <Link to={"https://www.omdbapi.com/"} target={"_blank"}>
          <p className="omdbReadMore">Read more</p>
        </Link>
      </div>
      <div className="rightFooter">
        <a href="#home">
          <p>
            <i className="fa-solid fa-magnifying-glass"></i> OMDB Searcher
          </p>
        </a>
      </div>
      <div className="copyright">
        <Link to={"https://www.markusohlsson.com"}>
          <i className="fa-regular fa-copyright"></i> markusohlsson.com 2023
        </Link>
      </div>
    </footer>
  );
};
