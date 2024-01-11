import React, { useState } from "react";
import Button from "../../ui/Button";
import { useMutation } from "react-query";
import { createTask } from "../../services/taskApi";
import { useToast } from "../../contexts/ToastContext";

const CreateTask = ({ projectId }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [parentTaskId, setParentTaskId] = useState("");
  const [teamId, setTeamId] = useState("");
  const { showToast } = useToast();

  const mutation = useMutation(createTask, {
    onSuccess: (data) => {
      showToast("Task created successfully", "success");
    },
    onError: (error) => {
      showToast(`Error: ${error.message}`, "error");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      task_name: taskName,
      description,
      deadline: new Date(deadline).getTime(),
      id_project: projectId,
      id_parent_task: parentTaskId,
      id_team: teamId,
    };

    mutation.mutate(newTask);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-5"
    >
      <h1 className="text-3xl text-blue-800 font-bold">Create Task</h1>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Task Name"
        className="text-center bg-blue-300 rounded-md"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="text-center bg-blue-300 rounded-md"
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        placeholder="Deadline"
        className="text-center bg-blue-300 rounded-md"
      />
      <input
        type="number"
        value={parentTaskId}
        onChange={(e) => setParentTaskId(e.target.value)}
        placeholder="Parent Task ID"
        className="text-center bg-blue-300 rounded-md"
      />
      <input
        type="number"
        value={teamId}
        onChange={(e) => setTeamId(e.target.value)}
        placeholder="Team ID"
        className="text-center bg-blue-300 rounded-md"
      />
      <button type="submit" className="bg-blue-500 hover:bg-blue-400">
        Create Task
      </button>
    </form>
  );
};

export default CreateTask;
