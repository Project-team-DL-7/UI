import React, { useState, useContext } from "react";
import Button from "../../ui/Button";
import { createProject } from "../../services/projectApi";
import { useMutation } from "react-query";
import { ProjectContext } from "../../contexts/ProjectContext";
import { useToast } from "../../contexts/ToastContext";

const CreateProjectForm = ({ setShowModal, refetch }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { showToast } = useToast();
  const { teams } = useContext(ProjectContext);

  // Initialize id_team with the first team's ID or an empty string if no teams are available
  const [id_team, setIdTeam] = useState(teams.length > 0 ? teams[0].id_team : "");

  const { mutate: createProjectMutation } = useMutation(
    (newProject) => createProject(newProject),
    {
      onSuccess: () => {
        showToast("Project created successfully", "success");
        setShowModal(false);
        refetch();
      },
      onError: (error) => {
        showToast(`Error: ${error.message}`, "error");
        setShowModal(false);
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      showToast("Project name cannot be empty", "error");
      return;
    }

    if (!description.trim()) {
      showToast("Description cannot be empty", "error");
      return;
    }

    const projectData = { name, description, id_team: Number(id_team) };
    createProjectMutation(projectData);
  };

  if (teams.length === 0) {
    return (
      <div>
        Loading teams or no teams available, you need to be in a team
        in order to create a project
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-6 items-center py-12"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl mt-5 font-bold shadow-md shadow-gray-100">
        Create New Project
      </h1>
      <input
        type="text"
        placeholder="Name"
        className="bg-blue-200 rounded-md text-center inline-block w-full py-3 px-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="bg-blue-200 rounded-md text-center inline-block w-full py-3 px-4 h-[10rem]"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="bg-blue-200 rounded-md text-center inline-block w-full py-3 px-4"
        value={id_team}
        onChange={(e) => setIdTeam(e.target.value)}
      >
        {teams.map((team) => (
          <option key={team.id_team} value={team.id_team}>
            {team.team_name}
          </option>
        ))}
      </select>
      <Button text={"Submit"} type="submit" />
    </form>
  );
};

export default CreateProjectForm;
