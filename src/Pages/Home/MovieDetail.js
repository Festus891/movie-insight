import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./MovieDetail.css";
import {
  img_300,
  noPicture,
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import Loader from "../../components/Loader/Loader";
import NoMovies from "../../components/Loader/NoMovies";

const MovieDetail = () => {
  const { id, media_type } = useParams();
  const [movie, setMovie] = useState(null);
  const [tvShow, setTvShow] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDragStart = (e) => e.preventDefault();

  useEffect(() => {
    window.scroll(0, 0);
    async function fetchData() {
      try {
        let contentRequest, trailerRequest, actorsRequest;

        if (media_type === "movie") {
          contentRequest = await axios.get(`/movie/${id}`);
          setMovie(contentRequest.data);

          trailerRequest = await axios.get(`/movie/${id}/videos`);
          setTrailer(trailerRequest.data.results[0]);

          actorsRequest = await axios.get(`/movie/${id}/credits`);
        } else if (media_type === "tv") {
          contentRequest = await axios.get(`/tv/${id}`);
          setTvShow(contentRequest.data);

          trailerRequest = await axios.get(`/tv/${id}/videos`);
          setTrailer(trailerRequest.data.results[0]);

          actorsRequest = await axios.get(`/tv/${id}/credits`);
        }

        setActors(actorsRequest.data.cast);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000); // Delay of 1 second (1000 ms)
      }
    }

    fetchData();
  }, [id, media_type]);

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

  if (!movie && !tvShow) {
    return <NoMovies />;
  }

  const content = movie || tvShow;
  const title = movie ? movie.title || movie.name : tvShow.name;
  const date = movie
    ? movie.first_air_date || movie.release_date
    : tvShow.first_air_date;
  const overview = movie ? movie.overview : tvShow.overview;
  const posterPath = movie ? movie.poster_path : tvShow.poster_path;
  const backdropPath = movie ? movie.backdrop_path : tvShow.backdrop_path;
  const tagline = movie ? movie.tagline : tvShow.tagline;
  const status = movie ? movie.status : tvShow.status;

  return (
    <div className="paper">
      <div className="content-Modal">
        <img
          src={posterPath ? `${img_500}/${posterPath}` : unavailable}
          alt={title}
          className="ContentModal-portrait"
        />
        <img
          src={
            backdropPath ? `${img_500}/${backdropPath}` : unavailableLandscape
          }
          alt={title}
          className="ContentModal-landscape"
        />

        <div className="ContentModal-about">
          <h1 className="ContentModal-title">
            {title} ({(date || "-----").substring(0, 4)})
          </h1>
          {tagline && <i className="taglines">{tagline}</i>}
          <h3>Overview</h3>
          <span className="ContentModal-description">{overview}</span>
          <p className="taglines">Status: {status}</p>

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
