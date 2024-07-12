import React, { useEffect, useState } from "react";
import requests from "../../request";
import axios from "../../axios";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  // function truncate(str, n) {
  //   return str?.length ? str.substr(0, n - 1) + "..." : str;
  // }

  console.log(movie);
  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        {/* title */}
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        {/* div > 2 button */}
        {/* <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div> */}
        {/* description */}
        {/* <h1 className="banner_description">{movie?.overview}</h1> */}
        {/* <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1> */}
      </div>

      <div className="banner--fadeBottom"></div>
    </header>
  );
};

export default Banner;
