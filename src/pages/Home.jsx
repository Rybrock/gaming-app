import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import GenreList from "../components/GenreList";
import Banner from "../components/Banner";
import Api from "../services/Api";
import TrendingGames from "../components/TrendingGames";
import GamesByGenresId from "../components/GamesByGenresId";
import GamesBySearch from "../components/GamesBySearch";

function Home() {
  const [gamesList, setGamesList] = useState([]);
  const [filteredGamesList, setFilteredGamesList] = useState([]);
  const [gamesListByGenresId, setGamesListByGenresId] = useState([]);
  const [selectedGenreName, setSelectedGenreName] = useState("Action");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    getGamesList();
    getGamesListByGenresId(4);
  }, []);

  const getGamesList = () => {
    Api.getGames()
      .then((response) => {
        setGamesList(response.data.results);
        setFilteredGamesList(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching games list", error);
      });
  };

  const getGamesListByGenresId = (id) => {
    Api.getGamesListByGenresId(id)
      .then((resp) => {
        setGamesListByGenresId(resp.data.results);
      })
      .catch((error) => {
        console.error("Error fetching games by genre", error);
      });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      Api.searchGames(query)
        .then((response) => {
          setFilteredGamesList(response.data.results);
        })
        .catch((error) => {
          console.error("Error searching games", error);
        });
    } else {
      setFilteredGamesList(gamesList);
    }
  };

  const handleGenreSelect = (id, name) => {
    setSearchQuery("");
    setSelectedGenreName(name);
    getGamesListByGenresId(id);
    setIsMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setFilteredGamesList(gamesList);
    setSelectedGenreName("Action");
    getGamesListByGenresId(4);
  };

  return (
    <div>
      <Header
        onSearch={handleSearch}
        onMenuToggle={handleMenuToggle}
        resetFilters={resetFilters}
      />
      <div className="grid grid-cols-4 px-8 h-full mb-10">
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-10 transition-transform transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 md:bg-transparent md:z-auto`}
        >
          <div className="bg-white dark:bg-gray-800 h-full p-4 md:p-0">
            <GenreList
              genreId={(id) => handleGenreSelect(id, selectedGenreName)}
              selectedGenreName={(name) => setSelectedGenreName(name)}
            />
          </div>
        </div>

        <div className="col-span-4 md:col-span-3">
          {searchQuery ? (
            <GamesBySearch gamesList={filteredGamesList} />
          ) : (
            <>
              {filteredGamesList?.length > 0 && (
                <div>
                  <Banner gameBanner={filteredGamesList[0]} />
                  <TrendingGames gamesList={filteredGamesList} />
                  <GamesByGenresId
                    gamesList={gamesListByGenresId}
                    selectedGenreName={selectedGenreName}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
