import React, { useContext, useState } from "react";
import Button from "../../ui/Button";
import Project from "./Project";
import Modal from "../../ui/Modal";
import CreateProjectForm from "./CreateProjectForm";
import { ProjectContext } from "../../contexts/ProjectContext";
import Loading from "../../ui/Loading";

const ProjectBox = () => {
  const [showModal, setShowModal] = useState(false);
  const { projects, refetchProjects, isProjectsLoading } =
    useContext(ProjectContext);
  const [search, setSearch] = useState("");

  if (isProjectsLoading) return <Loading />;
  if (!projects) {
    return null;
  }

  const filteredProjects = projects.filter((project) => {
    return (
      project.name && project.name.toLowerCase().includes(search.toLowerCase())
    );
  });

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
        <input
          placeholder="search"
          className="rounded-md text-center"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <h1 className="hidden text-3xl font-bold md:block text-blue-800">
          My Projects
        </h1>
        <Button
          text={"Add Project"}
          className={"hidden md:block "}
          onClick={() => setShowModal(true)}
        />
      </div>
      <div className="grid grid-cols-2 grid-rows-auto gap-3 mt-3 md:grid-cols-4 pb-4">
        {filteredProjects.map((projects) => (
          <Project
            projectId={projects.id_project}
            projectName={projects.name}
            data={projects}
            id_team={projects.id_team}
            key={projects.id_project}
          />
        ))}
      </div>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <CreateProjectForm
          setShowModal={setShowModal}
          refetch={refetchProjects}
          id_team={projects.id_team}
        />
      </Modal>
    </div>
  );
};

export default ProjectBox;
