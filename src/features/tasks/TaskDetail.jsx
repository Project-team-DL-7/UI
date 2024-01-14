import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Box from "../../ui/Box";
import Loading from "../../ui/Loading";
import TaskDelete from "./TaskDelete";
import TaskUpdate from "./TaskUpdate";
import { ProjectContext } from "../../contexts/ProjectContext";
import { MeContext } from "../../contexts/MeContext";
import SubTask from "./Subtask";

const TaskDetail = () => {
  const { id } = useParams();
  const { tasks, refetchTask, isTaskLoading } = useContext(ProjectContext);
  const { id: userId, username } = useContext(MeContext);
  const subTasks = tasks ? tasks.filter((task) => task.id_parent_task === Number(id)) : [];

  if (isTaskLoading) return <Loading />;
  if (!tasks) return null;
  const task = tasks.find((task) => task.id_task === Number(id));

  const deadlineDate = new Date(task.deadline);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const dateString = deadlineDate
    .toLocaleDateString(undefined, options)
    .replace(/\//g, ".");

  return (
    <Box>
      <div className="flex justify-between p-3">
        <h1 className="text-3xl font-bold text-blue-800 self-start ml-[1%]">
          {task.task_name.length > 15
            ? task.task_name.split(" ").map((word, index) => (
                <span key={index}>
                  {word}
                  <br />
                </span>
              ))
            : task.task_name}
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
          <p
            className={`ml-12 font-bold px-2 rounded text-white ${
              task.status === "TO DO"
                ? "bg-blue-500"
                : task.status === "IN PROGRESS"
                ? "bg-orange-500"
                : task.status === "DONE"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {task.status}
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-xl font-bold text-blue-800">Assigned to: </p>
          <p className="ml-12 font-bold">
            {task.id_user === userId ? username : ""}
          </p>
        </div>
      </div>
      <div className="mt-5">
        {task.id_parent_task == null && (
          <SubTask
            parentTaskId={id}
            projectId={task.id_project}
            refetch={refetchTask}
            isTaskLoading={isTaskLoading}
          />
        )}
      </div>
    </Box>
  );
};

export default TaskDetail;
