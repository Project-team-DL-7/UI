import React from "react";
import Navigation from "./Navigation";

const Sidebar = () => {
  return (
    <div className="hidden row-span-5 col-span-1 border-r-[1px] border-gray-300 shadow-xl shadow-gray-400 lg:block ">
      <Navigation />
    </div>
  );
};

export default Sidebar;
