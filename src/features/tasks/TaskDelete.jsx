import React from "react";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import { useMutation, useQueryClient } from "react-query";
import { deleteTask } from "../../services/taskApi";

const TaskDelete = ({ taskId, size }) => {
  const queryClient = useQueryClient(); // Initialize queryClient using useQueryClient hook
  const mutation = useMutation(() => deleteTask(taskId), {
    onSuccess: () => {
      console.log("Task deleted successfully!");

      queryClient.invalidateQueries("task", taskId);
    },
    onError: (error) => {
      console.error("Error deleting task:", error);
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
