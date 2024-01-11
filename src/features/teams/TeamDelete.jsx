import React from "react";
import { deleteTeam } from "../../services/teamApi";
import { useNavigate } from "react-router-dom";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import { useMutation } from "react-query";
import { useToast } from "../../contexts/ToastContext";

const TeamDelete = ({ id, refetch }) => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { mutate: deleteTeamMutation, isLoading } = useMutation(
    () => deleteTeam(id),
    {
      onSuccess: () => {
        navigate("/teams");
        showToast("Team deleted successfully", "success");
        refetch();
      },
      onError: (error) => {
        showToast(`Error: ${error.message}`, "error");
      },
    }
  );

  const handleDelete = () => {
    if (!isLoading) {
      deleteTeamMutation();
    }
  };

  return (
    <div className="cursor-pointer">
      <HiOutlineArchiveBoxXMark onClick={handleDelete} size={30} />
    </div>
  );
};

export default TeamDelete;
