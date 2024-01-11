import React from "react";
import { Link } from "react-router-dom";

const DashBoardTeam = ({ teamId, data }) => {
  return (
    <Link to={`/teams/${teamId}`} className="text-black">
      <div className="border-2 border-gray-400 rounded-md w-[7rem] md:w-[18rem] h-[6rem] mt-5">
        <h1 className="text-xl font-bold mt-2 flex justify-center">
          {data.id_team}
        </h1>
      </div>
    </Link>
  );
};

export default DashBoardTeam;
