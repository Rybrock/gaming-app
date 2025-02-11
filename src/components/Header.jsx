import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/app-logo.jpg";
import { HiOutlineSearch, HiMenu, HiX } from "react-icons/hi";
import { HiMoon, HiSun } from "react-icons/hi";
import { ThemeContext } from "../context/ThemeContext";

const Header = ({ onSearch, onMenuToggle, resetFilters }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useContext(ThemeContext);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className="flex items-center justify-between p-3">
      <div className="flex items-center">
        <HiMenu
          className="text-2xl md:hidden cursor-pointer"
          onClick={onMenuToggle}
        />
        <Link to="/" onClick={resetFilters}>
          <img
            src={logo}
            alt="logo"
            width={60}
            height={50}
            className="rounded-full ml-2"
          />
        </Link>
      </div>
      <div className="flex bg-slate-200 p-2 w-full items-center rounded-full mx-5 relative">
        <HiOutlineSearch />
        <input
          type="text"
          className="bg-transparent outline-none px-2 w-full"
          placeholder="Search Games"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchQuery && (
          <HiX
            className="text-xl cursor-pointer absolute right-2"
            onClick={handleClearSearch}
          />
        )}
      </div>
      <div>
        {theme === "light" ? (
          <HiMoon
            className="text-[35px] bg-slate-200 text-black p-1 rounded-full cursor-pointer"
            onClick={() => {
              setTheme("dark");
              localStorage.setItem("theme", "dark");
            }}
          />
        ) : (
          <HiSun
            className="text-[35px] bg-slate-200 text-black p-1 rounded-full cursor-pointer"
            onClick={() => {
              setTheme("light");
              localStorage.setItem("theme", "light");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
