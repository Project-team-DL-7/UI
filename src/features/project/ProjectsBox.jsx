import React, { useState } from "react";
import Button from "../../ui/Button";
import Project from "./Project";
import Modal from "../../ui/Modal";
import CreateProjectForm from "./CreateProjectForm";

const ProjectBox = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="h-full p-4 ">
      <div className="md:hidden flex mb-2 justify-center">
        <Button
          text={"Add Project"}
          className={"self-center"}
          onClick={() => setShowModal(true)}
        />
      </div>
      <div className="flex gap-2 md:justify-between justify-center">
        <input placeholder="search" className="rounded-md text-center" />
        <h1 className="hidden text-3xl font-bold md:block text-blue-800">
          Projects
        </h1>
        <Button
          text={"Add Project"}
          className={"hidden md:block "}
          onClick={() => setShowModal(true)}
        />
      </div>
      <div className="grid grid-cols-2 grid-rows-auto gap-3 mt-3 md:grid-cols-4 pb-4">
        <Project projectId={1} />
        <Project projectId={2} />
        <Project projectId={3} />
        <Project projectId={1} />
        <Project projectId={2} />
        <Project projectId={3} />
        <Project projectId={1} />
        <Project projectId={2} />
        <Project projectId={3} />
        <Project projectId={1} />
        <Project projectId={2} />
        <Project projectId={3} />
        <Project projectId={1} />
        <Project projectId={2} />
        <Project projectId={3} />
        <Project projectId={4} />
      </div>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <CreateProjectForm setShowModal={setShowModal} />
      </Modal>
    </div>
  );
};

export default ProjectBox;
