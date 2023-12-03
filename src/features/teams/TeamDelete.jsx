import React from "react";
import { deleteTeam } from "../../services/teamApi";
import { useNavigate } from "react-router-dom";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import { useMutation } from "react-query";

const TeamDelete = ({ id }) => {
  const navigate = useNavigate();

  const { mutate: deleteTeamMutation } = useMutation(() => deleteTeam(id), {
    onSuccess: () => {
      navigate("/teams");
    },
  });

  const handleDelete = () => {
    deleteTeamMutation();
  };

  return (
    <div className="cursor-pointer">
      <HiOutlineArchiveBoxXMark onClick={handleDelete} size={30} />
    </div>
  );
};

export default TeamDelete;
