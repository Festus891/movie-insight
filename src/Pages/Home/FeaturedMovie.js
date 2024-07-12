import React, { useEffect, useState } from "react";
import "./Featured.css";
import axios from "../../axios";
import { Link } from "react-router-dom";

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

  return (
    <div className="grid">
      <div className="grid_heading">
        <h1>Featured Movie</h1>
        <Link to="/trending">See more</Link>
      </div>

      <div className="row_posters">
        {movie.map((movies) => (
          <div className="posters" key={movies.id}>
            <Link to={`/movie/${movies.id}`}>
              <img
                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                src={`${base_url}${
                  isLargeRow ? movies.poster_path : movies.backdrop_path
                }`}
                alt={movies.name}
              />
            </Link>
            <b className="title">{movies.title || movies.name}</b>
            <span className="subTitle">
              {movies.media_type}
              <span className="subTitle">
                {movies.release_date || movies.first_air_date}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedMovie;
