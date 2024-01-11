import React, { useState } from "react";
import Button from "../../ui/Button";
import { createTeam } from "../../services/teamApi";
import { useMutation } from "react-query";

const CreateTeam = ({ setShowModal, refetch }) => {
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");

  const { mutate: createTeamMutation } = useMutation(
    (newTeam) => createTeam(newTeam),
    {
      onSuccess: (createdTeam) => {
        console.log("Team created:", createdTeam);   
        setShowModal(false);
        refetch();
      },
      onError: (error) => {
        console.error("Failed creating team:", error);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    createTeamMutation({ team_name: teamName, description: description });
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
