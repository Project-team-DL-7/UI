import React, { useContext, useState } from "react";
import Modal from "../../ui/Modal";
import Task from "./Task";
import CreateTask from "./CreateTask";
import Loading from "../../ui/Loading";
import { ProjectContext } from "../../contexts/ProjectContext";

const TasksBox = () => {
  const [showModal, setShowModal] = useState(false);
  const { tasks, refetchTasks, isTaskLoading } = useContext(ProjectContext);

  function handleModal() {
    setShowModal(true);
  }

  if (isTaskLoading) return <Loading />;

  console.log(tasks);
  const teamsIds = [...new Set(tasks.map((task) => task.id_team))];

  return (
    <div className="h-full p-4 ">
      <h1 className="flex w-full justify-center text-3xl font-bold text-blue-800">
        Tasks
      </h1>
      <div className="grid grid-cols-1 auto-rows-auto mt-5">
        {teamsIds.map((id) => {
          const tasksForTeams = tasks.filter((task) => task.id_team === id);
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
