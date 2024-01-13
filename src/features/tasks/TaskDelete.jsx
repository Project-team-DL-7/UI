import React, { useState } from "react";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import { useMutation } from "react-query";
import { deleteTask } from "../../services/taskApi";
import { useToast } from "../../contexts/ToastContext";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal";

const TaskDelete = ({ taskId, size, refetch }) => {
  const [showModal, setShowModal] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const mutation = useMutation(() => deleteTask(taskId), {
    onSuccess: () => {
      showToast("Task deleted successfully", "success");
      setShowModal(false);
      refetch();
      navigate("/tasks");
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
        size={size}
        onClick={() => setShowModal(true)}
      />
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <div className="mb-4">
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this task?</p>
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

export default TaskDelete;