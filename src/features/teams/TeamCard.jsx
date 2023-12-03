import React, { useEffect, useState } from "react";
import { getTeam } from "../../services/teamApi";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const TeamCard = ({ teamId }) => {
  const { data: team, isLoading } = useQuery(
    ["team", teamId],
    () => getTeam(teamId),
    {
      enabled: !!teamId,
    }
  );

  if (!teamId) {
    return <div>Please provide a team ID</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Link to={`/teams/${teamId}`}>
      <div className="mx-2 border-gray-500 border-[2px] rounded-md my-1 shadow-md shadow-gray-500">
        <h1 className="flex justify-center">{team.team_name}</h1>
      </div>
    </Link>
  );
};

export default TeamCard;
