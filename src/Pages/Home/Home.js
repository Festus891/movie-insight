import React from "react";
import Banner from "../../components/Banner/Banner";
import requests from "../../request";
import FeaturedMovie from "./FeaturedMovie";

const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedMovie fetchUrl={requests.fetchTrending} isLargeRow />
    </div>
  );
};

export default Home;
