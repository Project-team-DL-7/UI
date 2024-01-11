import React, { useState, useContext, useEffect } from "react"; // Import useEffect
import Button from "../../ui/Button";
import { createProject } from "../../services/projectApi";
import { useMutation } from "react-query";
import { ProjectContext } from "../../contexts/ProjectContext";

const CreateProjectForm = ({ setShowModal, refetch }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [id_team, setIdTeam] = useState(""); // Initialize with empty string

  const { teams } = useContext(ProjectContext);

  useEffect(() => {
    if (teams.length > 0) {
      setIdTeam(teams[0].id_team); // Update id_team once teams are loaded
    }
  }, [teams]); // Dependency array includes teams

  const { mutate: createProjectMutation } = useMutation(
    (newProject) => createProject(newProject),
    {
      onSuccess: (newProject) => {
        console.log("New project created:", newProject);
        setShowModal(false);
        refetch();
      },
      onError: (error) => {
        console.error("Failed to create project:", error.message);
        setShowModal(false);
      },
    }
  );

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleInputChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTeamChange = (event) => {
    setIdTeam(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const projectData = { name, description, id_team: Number(id_team) };
    createProjectMutation(projectData);
  };

  if (teams.length === 0) {
    return <div>Loading teams or no teams available...</div>;
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
        onChange={handleNameChange}
      />
      <textarea
        type="text"
        placeholder="Description"
        className="bg-blue-200 rounded-md text-center inline-block w-full py-3 px-4 h-[10rem]"
        value={description}
        onChange={handleInputChange}
      />
      <select
        className="bg-blue-200 rounded-md text-center inline-block w-full py-3 px-4"
        value={id_team}
        onChange={handleTeamChange}
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