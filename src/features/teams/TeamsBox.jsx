import React, { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Team from "./Team";
import CreateTeamForm from "./CreateTeamForm";

const TeamsBox = () => {
  const [showModal, setShowModal] = useState(false);

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
        <input placeholder="search" className="rounded-md text-center" />
        <h1 className="hidden text-3xl font-bold md:block text-blue-800">
          Teams
        </h1>
        <Button
          text={"Add Team"}
          className={"hidden md:block "}
          onClick={() => setShowModal(true)}
        />
      </div>
      <div className="grid grid-cols-2 grid-rows-auto gap-3 mt-3 md:grid-cols-4 pb-4">
        <Team teamId={1} />
      </div>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <CreateTeamForm setShowModal={setShowModal} />
      </Modal>
    </div>
  );
};

export default TeamsBox;
