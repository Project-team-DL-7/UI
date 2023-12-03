import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="col-span-4 row-span-1 border-gray-300 border-b-[1px] flex items-center justify-between p-2 lg:px-8 ">
      <Link to={"/"}>
        <h1 className="text-3xl font-bold text-blue-800 lg:text-4xl">
          Task Manager Pro
        </h1>
      </Link>
      <p>icon</p>
    </div>
  );
};

export default Header;
