import React from "react";
import TeamCard from "./TeamCard";

const TeamProjectCard = () => {
  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-xl font-bold text-blue-800 mb-3">Teams</h1>
      </div>
      <div className="grid grid-cols-2 auto-rows-auto">
        <TeamCard teamId={1} />
        <TeamCard teamId={5} />
      </div>
    </>
  );
};

export default TeamProjectCard;
