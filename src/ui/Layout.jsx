import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  const [showMenu, setShowMenu] = useState(true);

  return (
    <div className="grid grid-cols-4 grid-rows-6 h-screen">
      <Header setShowMenu={setShowMenu} showMenu={showMenu} />
      <Sidebar showMenu={showMenu} />
      <Outlet />
    </div>
  );
};

export default Layout;
