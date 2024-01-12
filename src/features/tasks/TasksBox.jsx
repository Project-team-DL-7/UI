import React, { useContext, useState } from "react";
import Modal from "../../ui/Modal";
import Task from "./Task";
import CreateTask from "./CreateTask";
import Loading from "../../ui/Loading";
import { ProjectContext } from "../../contexts/ProjectContext";
import Button from "../../ui/Button";

const TasksBox = () => {
  const [showModal, setShowModal] = useState(false);
  const { tasks, refetchTasks, isTaskLoading } = useContext(ProjectContext);

  function handleModal() {
    setShowModal(true);
  }

  if (isTaskLoading) return <Loading />;

  const teamsIds = [...new Set(tasks.map((task) => task.id_project))];

  return (
    <div className="h-full p-4 ">
      <div className="flex justify-between">
        <input placeholder="search" className="rounded-md text-center" />
        <h1 className="text-3xl font-bold text-blue-800">My Tasks</h1>
        <Button text="Create Task" onClick={handleModal} />
      </div>

      <div className="grid grid-cols-1 auto-rows-auto mt-5">
        {teamsIds.map((id) => {
          const tasksForTeams = tasks.filter((task) => task.id_project === id);
          return (
            <Task
              showModal={handleModal}
              projectId={id}
              key={id}
              tasks={tasksForTeams}
              refetch={refetchTasks}
              isTaskLoading={isTaskLoading}
            />
          );
        })}
      </div>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <CreateTask projectId={1} />
      </Modal>
    </div>
  );
};

export default TasksBox;
