import React, { useEffect, useState } from "react";
import GenreList from "../components/GenreList";
import Banner from "../components/Banner";
import Api from "../services/Api";
import TrendingGames from "../components/TrendingGames";
import GamesByGenresId from "../components/GamesByGenresId";

function Home() {
  const [gamesList, setGamesList] = useState([]);
  const [gamesListByGenresId, setGamesListByGenresId] = useState([]);
  const [selectedGenreName, setSelectedGenreName] = useState("Action");
  useEffect(() => {
    getGamesList();
    getGamesListByGenresId(4);
  }, []);
  const getGamesList = () => {
    Api.getGames()
      .then((response) => {
        setGamesList(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching genre list", error);
      });
  };

  const getGamesListByGenresId = (id) => {
    Api.getGamesListByGenresId(id)
      .then((resp) => {
        console.log("Fetched games:", resp.data.results);
        setGamesListByGenresId(resp.data.results);
      })
      .catch((error) => {
        console.error("Error fetching games by genre", error);
      });
  };
  return (
    <div className="grid grid-cols-4 px-8 h-full">
      <div className="hidden md:block">
        <GenreList
          genreId={(genreId) => getGamesListByGenresId(genreId)}
          selectedGenreName={(name) => setSelectedGenreName(name)}
        />
      </div>

      <div className="col-span-4 md:col-span-3">
        {gamesList?.length > 0 ? (
          <div>
            <Banner gameBanner={gamesList[0]} />
            <TrendingGames gamesList={gamesList} />
            <GamesByGenresId
              gamesList={gamesListByGenresId}
              selectedGenreName={selectedGenreName}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
