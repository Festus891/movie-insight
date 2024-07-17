import React, { useEffect, useState } from "react";
import { Badge } from "@material-ui/core";
import "./Featured.css";
import axios from "../../axios";
import { Link } from "react-router-dom";
import { img_300, unavailable } from "../../config/config";

const FeaturedMovie = ({ fetchUrl, isLargeRow }) => {
  const [movie, setMovie] = useState([]);

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      console.log(request.data.results);
      setMovie(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const generateMovieLink = (movies) => {
    if (movies.media_type === "movie") {
      return `/movie/${movies.id}`;
    } else if (movies.media_type === "tv") {
      return `/tv/${movies.id}`;
    } else {
      return `/other/${movies.id}`;
    }
  };

  return (
    <div className="grid">
      <div className="grid_heading">
        <h1>Featured Movie</h1>
        <Link to="/trending">See more</Link>
      </div>

      <div className="featured_movie">
        {movie.map((movies) => (
          <div className="movies" key={movies.id}>
            <Badge
              badgeContent={movies.vote_average}
              color={movies.vote_average > 6 ? "primary" : "secondary"}
            />
            <Link to={generateMovieLink(movies)} className="img_link">
              <img
                className="images"
                src={
                  movies.poster_path
                    ? `${img_300}/${movies.poster_path}`
                    : unavailable
                }
                alt={movies.name}
              />
            </Link>
            <b className="title">{movies.title || movies.name}</b>
            <span className="subTitle">
              {movies.media_type === "tv" ? "TV Series" : "Movie"}
            </span>
            <span className="subTitle">
              {movies.release_date || movies.first_air_date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedMovie;
