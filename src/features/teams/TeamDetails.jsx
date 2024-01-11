import React, { useContext } from "react";
import Box from "../../ui/Box";
import TeamMember from "./TeamMember";
import { useParams } from "react-router-dom";
import TeamDelete from "./TeamDelete";
import { ProjectContext } from "../../contexts/ProjectContext";
import Loading from "../../ui/Loading";

const TeamDetails = () => {
  const { id } = useParams();
  const { teams, refetchTeams, isTeamLoading } = useContext(ProjectContext);
  console.log(id);
  console.log(teams);

  if (isTeamLoading) return <Loading />;

  const team = teams.find((team) => team.id_team === Number(id));

  return (
    <Box>
      <div className="flex flex-col items-center">
        <div className="flex w-full justify-between items-center px-2">
          <h1 className="p-3 text-3xl font-bold text-blue-800">
            {team ? team.team_name : ""}
          </h1>
          <TeamDelete id={id} refetch={refetchTeams} />
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
