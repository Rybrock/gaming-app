import React, { useEffect, useState } from "react";
import GenreList from "../components/GenreList";
import Banner from "../components/Banner";
import Api from "../services/Api";
import TrendingGames from "../components/TrendingGames";

function Home() {
  const [gamesList, setGamesList] = useState([]);
  useEffect(() => {
    getGamesList();
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
  return (
    <div className="grid grid-cols-4 px-8 h-full">
      <div className="hidden md:block">
        <GenreList />
      </div>

      <div className="col-span-4 md:col-span-3">
        {gamesList?.length > 0 ? (
          <div>
            <Banner gameBanner={gamesList[0]} />
            <TrendingGames gamesList={gamesList} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
