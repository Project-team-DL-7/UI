import React, { useState, useContext } from "react";
import Button from "../../ui/Button";
import { createTask } from "../../services/taskApi";
import { useMutation } from "react-query";
import { ProjectContext } from "../../contexts/ProjectContext";
import { useToast } from "../../contexts/ToastContext";

const AddTask = ({ setShowModal, refetch, projectId }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const { showToast } = useToast();
  const { projects } = useContext(ProjectContext);

  const { mutate: createTaskMutation } = useMutation(
    (newTask) => createTask(newTask),
    {
      onSuccess: () => {
        showToast("Task created successfully", "success");
        setShowModal(false);
        refetch();
      },
      onError: (error) => {
        showToast(`Error: ${error.message}`, "error");
        setShowModal(false);
      },
    }
  );

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const taskData = {
      task_name: taskName,
      description,
      deadline: new Date(deadline).getTime(),
      id_project: Number(projectId),
    };
    createTaskMutation(taskData);
  };

  if (projects.length === 0) {
    return (
      <div>
        Loading projects or no projects available, you need to be in a project
        in order to create a task
      </div>
    );
  }

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
        className="bg-blue-200 rounded-md text-center inline-block w-full py-3 px-4"
        value={taskName}
        onChange={(event) => handleInputChange(event, setTaskName)}
      />
      <textarea
        type="text"
        placeholder="Description"
        className="bg-blue-200 rounded-md text-center inline-block w-full py-3 px-4 h-[10rem]"
        value={description}
        onChange={(event) => handleInputChange(event, setDescription)}
      />
      <input
        type="date"
        placeholder="Deadline"
        className="bg-blue-200 rounded-md text-center inline-block w-full py-3 px-4"
        value={deadline}
        onChange={(event) => handleInputChange(event, setDeadline)}
      />

      <Button text={"Submit"} type="submit" />
    </form>
  );
};

export default AddTask;
