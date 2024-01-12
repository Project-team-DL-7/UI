import React from "react";
import { Link } from "react-router-dom";

const DashBoardTeam = ({ teamId, data }) => {
  const nameLength = data.team_name.length;
  const truncatedTitle =
    nameLength > 10 ? data.team_name.substring(0, 10) + "..." : data.team_name;

  return (
    <Link to={`/teams/${teamId}`} className="text-black">
      <div className="border-2 border-gray-400 rounded-md w-[7rem] md:w-[10rem] h-[6rem] mt-5 hover:shadow-xl hover:bg-blend-darken">
        <h1 className="text-xl font-bold mt-2 flex justify-center">
          {truncatedTitle}
        </h1>
      </div>
    </Link>
  );
};

export default DashBoardTeam;
