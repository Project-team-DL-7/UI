import React, { useContext } from "react";
import TeamCard from "./TeamCard";
import { ProjectContext } from "../../contexts/ProjectContext";
import Loading from "../../ui/Loading";

const TeamProjectCard = ({ project }) => {
  const { teams, isTeamLoading } = useContext(ProjectContext);
  const id = project.id_team;

  if (isTeamLoading) return <Loading />;

  const team = teams.find((team) => team.id_team === id);

  return (
    <>
      <div className="flex gap-4 ml-[12%]">
        <h1 className="text-xl font-bold text-blue-800">Teams</h1>
        {<TeamCard key={team.id_team} data={team} teamId={team.id_team} />}
      </div>
    </>
  );
};

export default TeamProjectCard;
