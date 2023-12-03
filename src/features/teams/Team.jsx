import React, { useEffect, useState } from "react";
import { getTeam } from "../../services/teamApi";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

const Team = ({ teamId }) => {
  const { data: team, isLoading } = useQuery(
    ["team", teamId],
    () => getTeam(teamId),
    {
      enabled: !!teamId,
      refetchInterval: 15000, // Set the refetch interval to 15 seconds (15000 milliseconds)
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Link to={`/teams/${teamId}`} className="text-black">
      <div className="cursor-pointer border-2 border-gray-400 rounded-md max-h-[12rem] overflow-y-auto max-w-[15rem] shadow-md shadow-gray-400 hover:shadow-gray-700 flex flex-col items-center md:min-h-[9rem]">
        <h1 className="text-xl font-bold mt-2">{team.id_team}</h1>
        <p className="self-start p-2 whitespace-normal">{team.description}</p>
      </div>
    </Link>
  );
};

export default Team;
