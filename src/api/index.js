import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN = import.meta.env.VITE_MOVIE_APP_TMDB_TOKEN;

const headers = { Authorization: `bearer ${TMDB_TOKEN}` };

export const fetchDataFromApi = async (baseUrl, params) => {
  try {
    const { data } = await axios.get(BASE_URL + baseUrl, { headers, params });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
