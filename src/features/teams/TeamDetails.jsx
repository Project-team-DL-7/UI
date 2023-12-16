import React from "react";
import Box from "../../ui/Box";
import TeamMember from "./TeamMember";
import { useParams } from "react-router-dom";
import { getTeam } from "../../services/teamApi";
import TeamDelete from "./TeamDelete";
import { useQuery } from "react-query";

const TeamDetails = () => {
  const { id } = useParams();

  const { data: team, isLoading } = useQuery(["team", id], () => getTeam(id), {
    enabled: !!id,
  });

  if (!id) {
    return <div>Please select a team</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <div className="flex flex-col items-center">
        <div className="flex w-full justify-between items-center px-2">
          <h1 className="p-3 text-3xl font-bold text-blue-800">
            {team.team_name}
          </h1>
          <TeamDelete id={id} />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-5 ml-2 ">
        <TeamMember />
        <TeamMember />
        <TeamMember />
      </div>
    </Box>
  );
};

export default TeamDetails;
