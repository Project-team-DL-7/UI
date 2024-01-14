import React, { useState, useContext } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Team from "./Team";
import CreateTeamForm from "./CreateTeamForm";
import { ProjectContext } from "../../contexts/ProjectContext";
import Loading from "../../ui/Loading";

const TeamsBox = () => {
  const [showModal, setShowModal] = useState(false);
  const { teams, refetchTeam, isTeamLoading } = useContext(ProjectContext);
  const [search, setSearch] = useState("");

  if (isTeamLoading) return <Loading />;
  if (!teams) return null;

  const filteredTeams = teams.filter((team) => {
    return (
      team.team_name &&
      team.team_name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="h-full p-4 ">
      <div className="md:hidden flex mb-2 justify-center">
        <Button
          text={"Add Team"}
          className={"self-center"}
          onClick={() => setShowModal(true)}
        />
      </div>
      <div className="flex gap-2 md:justify-between justify-center">
        <input
          placeholder="search"
          className="rounded-md text-center"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <h1 className="hidden text-3xl font-bold md:block text-blue-800">
          My Teams
        </h1>
        <Button
          text={"Add Team"}
          className={"hidden md:block "}
          onClick={() => setShowModal(true)}
        />
      </div>
      <div className="grid grid-cols-2 grid-rows-auto gap-3 mt-3 md:grid-cols-4 pb-4">
        {filteredTeams.map((team) => (
          <Team teamId={team.id_team} key={team.id_team} data={team} />
        ))}
      </div>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <CreateTeamForm setShowModal={setShowModal} refetch={refetchTeam} />
      </Modal>
    </div>
  );
};

export default TeamsBox;
