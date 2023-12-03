import React from "react";
import {
  HiOutlineClipboardDocumentCheck,
  HiOutlineClipboardDocumentList,
  HiOutlineHome,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <ul className="flex flex-col items-start gap-5 mt-8 mx-[3rem]">
      <Link to={"/"}>
        <div className="flex items-center justify-center gap-2">
          <HiOutlineHome size={25} />
          <li className="text-xl font-bold text-blue-800">Dashboard</li>
        </div>
      </Link>
      <Link to={"/projects"}>
        <div className="flex items-center justify-center gap-2 ">
          <HiOutlineClipboardDocumentList size={25} />
          <li className="text-xl font-bold text-blue-800">Projects</li>
        </div>
      </Link>
      <Link to={"/teams"}>
        <div className="flex items-center justify-center gap-2">
          <HiOutlineUserGroup size={25} />
          <li className="text-xl font-bold text-blue-800">Teams</li>
        </div>
      </Link>
      <Link to={"/tasks"}>
        <div className="flex items-center justify-center gap-2">
          <HiOutlineClipboardDocumentCheck size={25} />
          <li className="text-xl font-bold text-blue-800">Tasks</li>
        </div>
      </Link>
    </ul>
  );
};

export default Navigation;
