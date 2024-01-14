import React, { useContext, useState, useEffect } from "react";
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
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch(`http://localhost:8000/user/team/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Response data:', data); // Log the response data
          setTeamMembers(data);
        } else {
          console.error("Error fetching team members:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, [id, refetchTeam]);

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
          {teamMembers && teamMembers.map((member) => (
            <TeamMember key={member.id_user} member={member} />
          ))}
        </div>
      </div>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <AddTeamMember teamId={id} />
      </Modal>
    </Box>
  );
};

export default TeamDetails;
