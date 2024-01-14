import React, { useContext, useState } from "react";
import Box from "../../ui/Box";
import TeamMember from "./TeamMember";
import { useParams } from "react-router-dom";
import TeamDelete from "./TeamDelete";
import TeamUpdate from "./TeamUpdate";
import { ProjectContext } from "../../contexts/ProjectContext";
import Loading from "../../ui/Loading";
import TaskPreview from "../tasks/TaskPreview";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import AddTeamMember from "./AddTeamMember";

const TeamDetails = () => {
  const { id } = useParams();
  const { teams, refetchTeam, isTeamLoading } = useContext(ProjectContext);
  const [showModal, setShowModal] = useState(false);

  if (isTeamLoading) return <Loading />;

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
      <div className="grid grid-cols-5 md:grid-cols-4 gap-2 mt-5 mx-2 h-[90%]">
        {/* tasks */}
        <div className="col-span-2  border-[1px] border-gray-500 px-2 max-h-[80%] overflow-y-auto">
          <h1 className="text-xl font-bold text-blue-800 text-center mb-3">
            Description
          </h1>
          <p className="font-bold">{team.description}</p>
        </div>
        {/* members */}
        <div className="col-span-2  border-[1px] border-gray-500 px-2 max-h-[80%] overflow-y-auto">
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
        <AddTeamMember id_team={id}/>
      </Modal>
    </Box>
  );
};

export default TeamDetails;
