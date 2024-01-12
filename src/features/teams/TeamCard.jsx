import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TeamCard = ({ teamId, data }) => {
  return (
    <Link to={`/teams/${teamId}`}>
      <div className=" border-gray-500 border-[2px] rounded-md  shadow-md shadow-gray-500 px-2">
        <h1 className="flex justify-center">{data.team_name}</h1>
      </div>
    </Link>
  );
};

export default TeamCard;
