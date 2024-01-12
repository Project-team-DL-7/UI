import React, { useState } from "react";
import Button from "../../ui/Button";
import { createTeam } from "../../services/teamApi";
import { useMutation } from "react-query";
import { useToast } from "../../contexts/ToastContext";

const CreateTeam = ({ setShowModal, refetch }) => {
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const { showToast } = useToast();

  const { mutate: createTeamMutation } = useMutation(
    (newTeam) => createTeam(newTeam),
    {
      onSuccess: (createdTeam) => {
        console.log("Team created:", createdTeam);   
        setShowModal(false);
        showToast("Team created successfully", "success");
        refetch();
      },
      onError: (error) => {
        showToast("Failed creating team:", "error");
        setShowModal(false);
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    createTeamMutation({
      team_name: teamName,
      description: description,
    });
  };

  return (
    <form
      className="flex flex-col gap-6 items-center py-12"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl mt-5 font-bold shadow-md shadow-gray-100">
        Create New Team
      </h1>
      <input
        type="text"
        placeholder="Team Name"
        className="bg-blue-200 rounded-md text-center w-[70%] h-[2rem]"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="bg-blue-200 rounded-md text-center inline-block w-[70%] h-[5rem]"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button text={"Submit"} type="submit" />
    </form>
  );
};

export default CreateTeam;
