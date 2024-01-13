import React from "react";
import { Link } from "react-router-dom";

const DashBoardProject = ({ projectId, data }) => {
  const nameLength = data.name.length;
  const truncatedName =
    nameLength > 10 ? data.name.substring(0, 10) + "..." : data.name;

  return (
    <Link to={`/projects/${projectId}`} className="text-black ">
      <div className="min-w-[8rem] md:min-w-[12rem] border-2 border-gray-400 rounded-md p-2 min-h-[6rem] col-span">
        <h1 className="flex justify-center font-bold text-xl">
          {truncatedName}
        </h1>
      </div>
    </Link>
  );
};

export default DashBoardProject;
