import React, { useState } from "react";
import Button from "../../ui/Button";
import { createProject } from "../../services/projectApi";
import { useMutation } from "react-query";

const CreateProjectForm = ({ setShowModal }) => {
  const [description, setDescription] = useState("");

  const { mutate: createProjectMutation } = useMutation(
    (newDescription) => createProject({ description: newDescription }),
    {
      onSuccess: (newProject) => {
        console.log("New project created:", newProject);
        setShowModal(false);
      },
      onError: (error) => {
        console.error("Failed to create project:", error.message);
        setShowModal(false);
      },
    }
  );

  const handleInputChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createProjectMutation(description);
  };
  return (
    <form
      className="flex flex-col gap-6 items-center py-12"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl mt-5 font-bold shadow-md shadow-gray-100">
        Create New Project
      </h1>
      <textarea
        type="text"
        placeholder="Description"
        className="bg-blue-200 rounded-md text-center inline-block w-full py-3 px-4 h-[10rem]"
        value={description}
        onChange={handleInputChange}
      />
      <Button text={"Submit"} type="submit" />
    </form>
  );
};

export default CreateProjectForm;
