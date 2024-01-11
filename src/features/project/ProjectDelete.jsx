import React from "react";
import { deleteProject } from "../../services/projectApi";
import { useNavigate } from "react-router-dom";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import { useMutation } from "react-query";
import { useToast } from "../../contexts/ToastContext";

const ProjectDelete = ({ id, refetch }) => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { mutate } = useMutation(() => deleteProject(id), {
    onSuccess: () => {
      navigate("/projects");
      showToast("Project deleted successfully", "success");
      refetch();
    },
    onError: (error) => {
      showToast(`Error: ${error.message}`, "error");
    },
  });

  const handleDelete = () => {
    mutate();
  };

  return (
    <div className="cursor-pointer">
      <HiOutlineArchiveBoxXMark onClick={handleDelete} size={30} />
    </div>
  );
};

export default ProjectDelete;
