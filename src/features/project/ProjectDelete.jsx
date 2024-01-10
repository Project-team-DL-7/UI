import React from "react";
import { deleteProject } from "../../services/projectApi";
import { useNavigate } from "react-router-dom";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import { useMutation } from "react-query";

const ProjectDelete = ({ id, refetch }) => {
  const navigate = useNavigate();

  const { mutate } = useMutation(() => deleteProject(id), {
    onSuccess: () => {
      navigate("/projects");
      refetch();
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
