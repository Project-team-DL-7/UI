import React, { useState } from "react";
import { deleteTeam } from "../../services/teamApi";
import { useNavigate } from "react-router-dom";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import { useMutation } from "react-query";
import Modal from "../../ui/Modal";
import { useToast } from "../../contexts/ToastContext";

const TeamDelete = ({ id, refetch }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { showToast } = useToast();

  const mutation = useMutation(() => deleteTeam(id), {
    onSuccess: () => {
      navigate("/teams");
      showToast("Team deleted successfully", "success");
      refetch();
    },
    onError: (error) => {
      showToast(`Error: ${error.message}`, "error");
    },
  });

  const handleDelete = () => {
    setShowModal(false);
    mutation.mutate();
  };

  return (
    <div className="cursor-pointer">
      <HiOutlineArchiveBoxXMark size={30} onClick={() => setShowModal(true)} />
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <div className="mb-4">
          <h2>Confirm Deletion</h2>
          <p>
            Deleting a team will delete all its projects and tasks. Are you sure
            you want to delete this team?
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

export default TeamDelete;