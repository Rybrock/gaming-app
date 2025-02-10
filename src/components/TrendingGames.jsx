import React, { useEffect } from "react";

const TrendingGames = ({ gamesList }) => {
  useEffect(() => {
    console.log(gamesList);
  }, [gamesList]);
  return (
    <div className="mt-5 hidden md:block">
      <h2 className="text-[30px] font-bold dark:text-white">Trending Games</h2>
      <div className="md:grid md:grid-cols-3 gap-4 mt-5 lg:grid-cols-4">
        {gamesList.map((game) => (
          <div
            className="bg-slate-400 rounded-lg hover:scale-110 transition-all ease-out duration-300 cursor-pointer"
            key={game.id}
          >
            <img
              src={game.background_image}
              className="h-[270px] rounded-t-lg object-cover"
              alt=""
            />
            <h2 className="dark:text-white font-bold text-[20px] pb-2 p-2">
              {game.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingGames;
