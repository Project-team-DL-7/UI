import React, { useState } from "react";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import { useMutation } from "react-query";
import { deleteProject } from "../../services/projectApi";
import { useToast } from "../../contexts/ToastContext";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal";

const ProjectDelete = ({ id, refetch }) => {
  const [showModal, setShowModal] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const mutation = useMutation(() => deleteProject(id), {
    onSuccess: () => {
      showToast("Project deleted successfully", "success");
      setShowModal(false);
      refetch();
      navigate("/projects");
    },
    onError: (error) => {
      setShowModal(false);
      showToast(`Error: ${error.message}`, "error");
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <div className="cursor-pointer">
      <HiOutlineArchiveBoxXMark
        className="text-center rounded-md"
        size={30}
        onClick={() => setShowModal(true)}
      />
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <div className="mb-4">
          <h2>Confirm Deletion</h2>
          <p>
            Deleting a project will delete all its tasks. Are you sure you want
            to delete this project?
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <button onClick={handleDelete}>
            Yes, delete it
          </button>
          <button onClick={() => setShowModal(false)}>No, keep it</button>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectDelete;