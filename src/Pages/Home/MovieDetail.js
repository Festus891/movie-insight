import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./MovieDetail.css";
import { img_300, noPicture } from "../../config/config";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import Loader from "../../components/Loader/Loader";
import NoMovies from "../../components/Loader/NoMovies";

const MovieDetail = ({ isLargeRow }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);

  const base_url = "https://image.tmdb.org/t/p/original/";
  const handleDragStart = (e) => e.preventDefault();
  useEffect(() => {
    window.scroll(0, 0);
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
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000); // Delay of 1 second (1000 ms)
      }
    }

    fetchMovieData();
  }, [id]);

  const items = actors.map((actor) => (
    <div className="carouselItem">
      <img
        src={
          actor.profile_path ? `${img_300}/${actor.profile_path}` : noPicture
        }
        alt={actor?.name}
        onDragStart={handleDragStart}
        className="carouselItem-img"
      />
      <b className="carouselItem-txt">{actor?.name}</b>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  if (loading) {
    return <Loader />;
  }

  if (!movie) {
    return <NoMovies />;
  }

  return (
    <div className="paper">
      <div className="contentModal">
        <img
          src={
            movie.poster_path ? `${img_500}/${movie.poster_path}` : unavailable
          }
          alt={movie.name || movie.title}
          className="ContentModal-portrait"
        />
        <img
          src={
            movie.backdrop_path
              ? `${img_500}/${movie.backdrop_path}`
              : unavailableLandscape
          }
          alt={movie.name || movie.title}
          className="ContentModal-landscape"
        />

        <div className="ContentModal-about">
          <h1 className="ContentModal-title">
            {movie.title || movie.name}(
            {(movie.first_air_date || movie.release_date || "-----").substring(
              0,
              4
            )}
            )
          </h1>
          {movie.tagline && <i className="taglines">{movie.tagline}</i>}
          <h3>overview</h3>
          <span className="ContentModal-description">{movie.overview}</span>
          <p className="taglines">Movie_Status: {movie.status}</p>

          <h2 className="taglines">Starring</h2>
          <div>
            <AliceCarousel
              mouseTracking
              infinite
              disableDotsControls
              disableButtonsControls
              responsive={responsive}
              items={items}
              autoPlay
            />
          </div>
        </div>
      </div>
      {trailer && (
        <div className="trailer-container">
          <h2>Watch Trailer</h2>
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
