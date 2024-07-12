const API_KEY = process.env.REACT_APP_API_KEY;

const requests = {
  fetchFeaturedMovie: `/discover/tv?api_key=${API_KEY}&include_adult=false&include_null_first_air_dates=false&language=en-US&sort_by=popularity.desc&with_networks=213`,
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
};

export default requests;
