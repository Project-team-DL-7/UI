import React, { useState } from "react";
import Button from "../../ui/Button";
import { createProject } from "../../services/projectApi";
import { useMutation } from "react-query";
import { useToast } from "../../contexts/ToastContext";

const CreateProjectForm = ({ setShowModal, refetch }) => {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const { showToast } = useToast();

  const { mutate: createProjectMutation } = useMutation(
    (newProject) => createProject(newProject),
    {
      onSuccess: (newProject) => {
        showToast("Project created successfully", "success");
        setShowModal(false);
        refetch();
      },
      onError: (error) => {
        showToast("Failed creating project:", "error");
        setShowModal(false);
      },
    }
  );

  const handleInputChange = (event) => {
    setDescription(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createProjectMutation({ description, name });
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
      <input
        type="text"
        placeholder="Project Name"
        className="bg-blue-200 rounded-md text-center inline-block w-full py-3 px-4"
        value={name}
        onChange={handleNameChange}
      />
      <Button text={"Submit"} type="submit" />
    </form>
  );
};

export default CreateProjectForm;
