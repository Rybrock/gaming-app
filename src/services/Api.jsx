import axios from "axios";

const key = "b5d523a75dce4411ae5fd7d8dd15941e";
const axiosCreate = axios.create({
  baseURL: "https://api.rawg.io/api",
});

const getGenres = () => {
  return axiosCreate.get(`/genres?key=${key}`);
};

const getGames = () => {
  return axiosCreate.get(`/games?key=${key}`);
};

const getGamesListByGenresId = (id) =>
  axiosCreate.get("/games?key=" + key + "&genres=" + id);

const searchGames = (query) =>
  axiosCreate.get(`/games?search=${query}&key=${key}`);

export default {
  getGenres,
  getGames,
  getGamesListByGenresId,
  searchGames,
};
