import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Box from "../../ui/Box";
import Loading from "../../ui/Loading";
import TaskDelete from "./TaskDelete";
import TaskUpdate from "./TaskUpdate";
import { ProjectContext } from "../../contexts/ProjectContext";
import { MeContext } from "../../contexts/MeContext";

const TaskDetail = () => {
  const { id } = useParams();
  const { tasks, refetchTask, isTaskLoading } = useContext(ProjectContext);
  const { id: userId } = useContext(MeContext);

  if (isTaskLoading) return <Loading />;

  const task = tasks.find((task) => task.id_task === Number(id));

  const deadlineDate = new Date(task.deadline);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const dateString = deadlineDate
    .toLocaleDateString(undefined, options)
    .replace(/\//g, ".");

  return (
    <Box>
      <div className="flex justify-between p-3">
        <h1 className="text-3xl font-bold text-blue-800 self-start ml-[10%]">
          {task.task_name}
        </h1>
        <div className="flex gap-3">
          <TaskUpdate
            id={id}
            id_project={task.id_project}
            id_user={userId}
            refetch={refetchTask}
            originalName={task.task_name}
            originalDescription={task.description}
            originalDeadline={task.deadline}
            originalStatus={task.status}
          />
          <TaskDelete taskId={id} refetch={refetchTask} size={30} />
        </div>
      </div>
      <div className="flex flex-col mx-4 my-4 gap-3">
        <div className="flex max-h-[12rem] items-center">
          <p className="text-xl font-bold text-blue-800">Description:</p>
          <p className="overflow-wrap-normal max-h-[10rem] overflow-y-auto ml-5">
            {task.description}
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-xl font-bold text-blue-800">Deadline: </p>
          <p className="ml-12 font-bold">{dateString}</p>
        </div>
        <div className="flex items-center">
          <p className="text-xl font-bold text-blue-800">Status: </p>
          <p className="ml-12 font-bold">{task.status}</p>
        </div>
      </div>
    </Box>
  );
};

export default TaskDetail;
