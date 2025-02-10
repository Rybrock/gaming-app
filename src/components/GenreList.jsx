import React, { useEffect, useState } from "react";
import Api from "../services/Api";

function GenreList({ genreId, selectedGenreName }) {
  const [genreList, setGenreList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getGenreList();
  }, []);

  const getGenreList = () => {
    Api.getGenres()
      .then((response) => {
        // console.log(response.data.results);
        setGenreList(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching genre list", error);
      });
  };

  return (
    <div>
      <h2 className="text-[30px] font-bold dark:text-white">Genre</h2>
      <div className="">
        {genreList.map((genre, index) => (
          <div
            key={index}
            className={`group genre-item flex items-center gap-2 mb-2 cursor-pointer hover:bg-gray-300 rounded-lg p-2 hover:dark:bg-gray-600 ${
              activeIndex === index ? "bg-gray-300 dark:bg-gray-600" : null
            }`}
            onClick={() => {
              setActiveIndex(index);
              genreId(genre.id);
              selectedGenreName(genre.name);
            }}
          >
            {genre.image_background && (
              <img
                src={genre.image_background}
                className={`w-[40px] h-[40px] object-cover group-hover:scale-105 transition-all ease-out duration-300 rounded-lg ${
                  activeIndex === index ? "scale-105" : null
                }`}
                alt={genre.name}
              />
            )}
            <h3
              className={`dark:text-white text-[18px] group-hover:font-bold transition-all ease-out duration-300 ${
                activeIndex === index ? "font-bold" : null
              }`}
            >
              {genre.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GenreList;
