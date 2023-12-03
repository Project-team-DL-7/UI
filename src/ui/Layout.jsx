import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-6 h-screen">
      <Header />
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Layout;
