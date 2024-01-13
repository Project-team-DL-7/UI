import React, { useContext } from "react";
import TaskPreview from "./TaskPreview";
import { ProjectContext } from "../../contexts/ProjectContext";
import Loading from "../../ui/Loading";

const TaskProjectCard = ({ projectId }) => {
  const { tasks, isTaskLoading } = useContext(ProjectContext);

  if (isTaskLoading) return <Loading />;

  const projectTasks = tasks.filter(task => task.id_project === projectId);

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-xl font-bold text-blue-800 mb-3">Tasks</h1>
      </div>
      <div className="grid grid-cols-2 auto-rows-auto gap-2">
        {projectTasks.map((task) => (
          <TaskPreview key={task.id_task} data={task} taskId={task.id_task} />
        ))}
      </div>
    </>
  );
};

export default TaskProjectCard;
