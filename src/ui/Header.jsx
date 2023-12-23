import React, { useContext } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { MeContext } from "../contexts/MeContext";

const API_URL = "http://localhost:8000";

const Header = ({ setShowMenu, showMenu }) => {
  function handleMenu() {
    setShowMenu(!showMenu);
  }

  const { refetch } = useContext(MeContext);

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

      <button
        onClick={async () => {
          try {
            await fetch(`${API_URL}/logout`, {
              method: "POST",
              credentials: "include",
              redirect: "manual",
            });
            await refetch();
          } catch (err) {
            console.error(err);
          }
        }}
        className="bg-blue-600 hover:bg-blue-500"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
