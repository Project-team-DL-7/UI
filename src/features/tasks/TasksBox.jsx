import React, { useContext, useState } from "react";
import Button from "../../ui/Button";
import Task from "./Task";
import Modal from "../../ui/Modal";
import CreateTaskForm from "./CreateTaskForm";
import { ProjectContext } from "../../contexts/ProjectContext";
import Loading from "../../ui/Loading";

const TasksBox = () => {
  const [showModal, setShowModal] = useState(false);
  const { tasks, refetchTask, isTaskLoading, projects } =
    useContext(ProjectContext);
  const [search, setSearch] = useState("");

  if (isTaskLoading) return <Loading />;

  const filteredTasks = tasks.filter((task) => {
    return (
      task.task_name &&
      task.task_name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="h-full p-4 ">
      <div className="md:hidden flex mb-2 justify-center">
        <Button
          text={"Create Task"}
          className={"self-center"}
          onClick={() => setShowModal(true)}
        />
      </div>
      <div className="flex gap-2 md:justify-between justify-center">
        <input
          placeholder="search"
          className="rounded-md text-center"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <h1 className="hidden text-3xl font-bold md:block text-blue-800">
          My Tasks
        </h1>
        <Button
          text={"Create Task"}
          className={"hidden md:block "}
          onClick={() => setShowModal(true)}
        />
      </div>
      <div className="grid grid-cols-1 auto-rows-auto mt-5">
        {projects
          .filter((project) =>
            filteredTasks.some((task) => task.id_project === project.id_project)
          )
          .map((project) => (
            <Task
              projectId={project.id_project}
              key={project.id_project}
              tasks={filteredTasks}
              refetch={refetchTask}
              isTaskLoading={isTaskLoading}
            />
          ))}
      </div>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <CreateTaskForm setShowModal={setShowModal} refetch={refetchTask} />
      </Modal>
    </div>
  );
};

export default TasksBox;
