import React, { useState } from "react";
import Button from "../../ui/Button";
import { useMutation } from "react-query";
import { createTask } from "../../services/taskApi";

const CreateTask = ({ projectId }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const mutation = useMutation((newTask) => createTask(newTask, projectId), {
    onSuccess: () => {
      console.log("Task created successfully!");
    },
    onError: (error) => {
      console.error("Error creating task:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id_project: projectId,
      task_name: taskName,
      description: description,
      deadline: new Date(deadline).getTime(),
    };

    mutation.mutate(newTask);
  };

  return (
    <form
      className="flex flex-col gap-6 items-center py-12"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl mt-5 font-bold shadow-md shadow-gray-100">
        Add Task
      </h1>
      <input
        type="text"
        placeholder="Task Name"
        className="bg-blue-200 rounded-md text-center"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="bg-blue-200 rounded-md text-center inline-block w-[70%] h-[5rem]"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        placeholder="Deadline"
        className="bg-blue-200 rounded-md text-center"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <Button text={"Submit"} type="submit" />
    </form>
  );
};

export default CreateTask;
