import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./MovieDetail.css";

const MovieDetail = ({ isLargeRow }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [actors, setActors] = useState([]);

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchMovieData() {
      try {
        const movieRequest = await axios.get(`/movie/${id}`);
        console.log(movieRequest);
        setMovie(movieRequest.data);

        const trailerRequest = await axios.get(`/movie/${id}/videos`);
        setTrailer(trailerRequest.data.results[0]);

        const actorsRequest = await axios.get(`/movie/${id}/credits`);
        setActors(actorsRequest.data.cast);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    }

    fetchMovieData();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-detail-container">
      <div className="details_content">
        <img
          src={`${base_url}${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />

        <div className="movie_details">
          <h1 className="movie-title">
            {movie.title || movie.name}
            <span>{movie.release_date}</span>
          </h1>
          <p>{movie.tagline}</p>
          <p>{movie.status}</p>
          <p className="movie-overview">{movie.overview}</p>
          <h2>Actors</h2>
          <Carousel
            showArrows={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            autoPlay={true}
            interval={3000}
            axis="horizontal"
          >
            {actors.map((actor) => (
              <div className="actor-card" key={actor.id}>
                <img
                  src={
                    actor.profile_path
                      ? `${base_url}${actor.profile_path}`
                      : "default_actor_image_url"
                  }
                  alt={actor.name}
                  className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                />
                <p className="actor-name">{actor.name}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      {trailer && (
        <div className="trailer-container">
          <h2>Trailer</h2>
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
            className="trailer-video"
          />
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
