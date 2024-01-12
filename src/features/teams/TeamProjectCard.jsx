import React, { useContext } from "react";
import TeamCard from "./TeamCard";
import { ProjectContext } from "../../contexts/ProjectContext";
import Loading from "../../ui/Loading";

const TeamProjectCard = () => {
  const { teams, isTeamLoading } = useContext(ProjectContext);

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-xl font-bold text-blue-800 mb-3">Teams</h1>
      </div>
      <div className="grid grid-cols-2 auto-rows-auto">
        {/* <TeamCard teamId={1} /> */}
        {teams.map((team) => (
          <TeamCard key={team.id_team} data={team} teamId={team.id_team} />
        ))}
      </div>
    </>
  );
};

export default TeamProjectCard;
