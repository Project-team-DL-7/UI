import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineBars3 } from "react-icons/hi2";

const Header = ({ setShowMenu, showMenu }) => {
  function handleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <div className="col-span-4 row-span-1 border-gray-300 border-b-[1px] flex items-center justify-between p-2 lg:px-8 ">
      <Link to={"/"}>
        <h1 className="text-3xl font-bold text-blue-800 lg:text-4xl">
          Task Manager Pro
        </h1>
      </Link>
      <div className="lg:hidden cursor-pointer" onClick={handleMenu}>
        <HiOutlineBars3 size={30} />
      </div>
    </div>
  );
};

export default Header;
