import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Project = ({ projectId, projectName, data }) => {
  const description = data.description;
  const truncatedDescription =
    description.length > 20
      ? data.description.substring(0, 20) + "..."
      : data.description;

  return (
    <Link to={`/projects/${projectId}`} className="text-black">
      <div className="cursor-pointer border-2 border-gray-400 rounded-md max-h-[12rem] overflow-y-auto max-w-[15rem] shadow-md shadow-gray-400 hover:shadow-gray-700 flex flex-col items-center md:min-h-[9rem]">
        <h1 className="text-xl font-bold mt-2">{projectName}</h1>{" "}
        {/* Use projectName here */}
        <p className="self-start p-2 whitespace-normal">
          {truncatedDescription}
        </p>
      </div>
    </Link>
  );
};

export default Project;
