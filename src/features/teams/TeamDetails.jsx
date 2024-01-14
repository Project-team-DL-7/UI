import React, { useContext, useState } from "react";
import Box from "../../ui/Box";
import TeamMember from "./TeamMember";
import { useParams } from "react-router-dom";
import TeamDelete from "./TeamDelete";
import TeamUpdate from "./TeamUpdate";
import { ProjectContext } from "../../contexts/ProjectContext";
import Loading from "../../ui/Loading";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import AddTeamMember from "./AddTeamMember";

const TeamDetails = () => {
  const { id } = useParams();
  const { teams, refetchTeam, isTeamLoading } = useContext(ProjectContext);
  const [showModal, setShowModal] = useState(false);

  if (isTeamLoading) return <Loading />;
  if (!teams) return null;
  const team = teams.find((team) => team.id_team === Number(id));

  return (
    <Box>
      <div className="flex flex-col items-center">
        <div className="flex w-full justify-between items-center px-2">
          <h1 className="p-3 text-3xl font-bold text-blue-800">
            {team.team_name}
          </h1>
          <div className="flex gap-2">
            <TeamUpdate
              id={id}
              refetch={refetchTeam}
              originalName={team.team_name}
              originalDescription={team.description}
            />

            <TeamDelete id={id} refetch={refetchTeam} />
          </div>
        </div>
      </div>
      <Button
        text={"Add Member"}
        className={"ml-5"}
        onClick={() => setShowModal(true)}
      />
      <div className="flex flex-col my-4 gap-8 w-[90%] md:flex-row md:h-[28rem] ml-[5%]">
        {/* tasks */}
        <div className="h-[15rem] border-gray-400 border-[2px] rounded-md shadow-gray-500 shadow-md md:w-[50%] md:h-[100%] overflow-auto">
          <h1 className="text-xl font-bold text-blue-800 text-center mb-3">
            Description
          </h1>
          <p className="font-bold">{team.description}</p>
        </div>
        {/* members */}
        <div className="h-[15rem] border-gray-400 border-[2px] rounded-md shadow-gray-500 shadow-md md:w-[50%] md:h-[100%] overflow-auto">
          <h1 className="text-xl font-bold text-blue-800 text-center mb-3">
            Members
          </h1>
          <TeamMember />
          <TeamMember />
          <TeamMember />
          <TeamMember />
          <TeamMember />
          <TeamMember />
          <TeamMember />
          <TeamMember />
          <TeamMember />
          <TeamMember />
          <TeamMember />
        </div>
      </div>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <AddTeamMember />
      </Modal>
    </Box>
  );
};

export default TeamDetails;
