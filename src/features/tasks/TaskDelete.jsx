import React from "react";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import { useMutation, useQueryClient } from "react-query";
import { deleteTask } from "../../services/taskApi";
import { useToast } from "../../contexts/ToastContext";

const TaskDelete = ({ taskId, size, refetch }) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const mutation = useMutation(() => deleteTask(taskId), {
    onSuccess: () => {
      showToast("Task deleted successfully", "success");
      refetch();
    },

    onError: (error) => {
      showToast(`Error: ${error.message}`, "error");
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <div>
      <HiOutlineArchiveBoxXMark
        className="text-blue-800 cursor-pointer"
        size={size}
        onClick={handleDelete}
      />
    </div>
  );
};

export default TaskDelete;
