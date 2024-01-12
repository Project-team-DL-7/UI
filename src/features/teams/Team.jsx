import React from "react";
import { Link } from "react-router-dom";

const Team = ({ teamId, data }) => {
  return (
    <Link to={`/teams/${teamId}`} className="text-black">
      <div className="cursor-pointer border-2 border-gray-400 rounded-md max-h-[12rem] overflow-y-auto max-w-[15rem] shadow-md shadow-gray-400 hover:shadow-gray-700 flex flex-col items-center md:min-h-[9rem]">
        <h1 className="text-xl font-bold mt-2">{data.team_name}</h1>
        <p className="self-start p-2 whitespace-normal">{data.description}</p>
      </div>
    </Link>
  );
};

export default Team;
