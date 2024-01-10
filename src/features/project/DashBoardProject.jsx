import React from "react";
import { Link } from "react-router-dom";

const DashBoardProject = ({ projectId, data }) => {
  return (
    <Link to={`/projects/${projectId}`} className="text-black ">
      <div className="min-w-[8rem] md:min-w-[12rem] border-2 border-gray-400 rounded-md p-2 min-h-[6rem] col-span">
        <h1 className="flex justify-center font-bold text-xl">
          {data.id_project}
        </h1>
        {/* <p className="flex justify-center my-2">name</p> */}
      </div>
    </Link>
  );
};

export default DashBoardProject;
