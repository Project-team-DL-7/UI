import React, { useContext } from "react";
import {
  HiOutlineClipboardDocumentCheck,
  HiOutlineClipboardDocumentList,
  HiOutlineHome,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import { MeContext } from "../contexts/MeContext";
const API_URL = import.meta.env.VITE_BE_URL;

const Navigation = () => {
  const { refetch } = useContext(MeContext);

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
        className="bg-blue-600 hover:bg-blue-500 w-full"
      >
        Logout
      </button>
    </ul>
  );
};

export default Navigation;
