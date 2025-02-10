import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/images/app-logo.jpg";
import { HiOutlineSearch } from "react-icons/hi";
import { HiMoon } from "react-icons/hi";
import { HiSun } from "react-icons/hi";
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
  const [toggle, setToggle] = useState(true);
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="flex items-center justify-center p-3">
      <img
        src={logo}
        alt="logo"
        width={60}
        height={50}
        className="rounded-full"
      />
      <div className="flex bg-slate-200 p-2 w-full items-center rounded-full mx-5">
        <HiOutlineSearch />
        <input
          type="text"
          className="bg-transparent outline-none px-2"
          placeholder="Search Games"
        />
      </div>
      <div>
        {theme == "light" ? (
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
