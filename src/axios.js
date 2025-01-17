import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;

// base url to make request to the movie database also the base url which our requests will append to
// example like this : "https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US"
const instance = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
  params: {
    api_key: API_KEY,
  },
});

export default instance;
