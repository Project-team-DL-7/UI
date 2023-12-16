import React from "react";
import { getTeam } from "../../services/teamApi";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

const DashBoardTeam = ({ teamId }) => {
  const { data: team, isLoading } = useQuery(
    ["team", teamId],
    () => getTeam(teamId),
    {
      enabled: !!teamId,
      refetchInterval: 15000,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Link to={`/teams/${teamId}`} className="text-black">
      <div className="border-2 border-gray-400 rounded-md w-[7rem] md:w-[10rem]">
        <h1 className="text-xl font-bold mt-2 flex justify-center">
          {team.id_team}
        </h1>
        <p className="self-start p-2 whitespace-normal flex justify-center">
          {team.description}
        </p>
      </div>
    </Link>
  );
};

export default DashBoardTeam;
