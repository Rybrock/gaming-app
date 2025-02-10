import axios from "axios";

const key = "d92872cf68c54fc8b2d27ae78e86d994";
const axiosCreate = axios.create({
  baseURL: "https://api.rawg.io/api",
});

const getGenres = () => {
  return axiosCreate.get(`/genres?key=${key}`);
};

const getGames = () => {
  return axiosCreate.get(`/games?key=${key}`);
};

export default {
  getGenres,
  getGames,
};
