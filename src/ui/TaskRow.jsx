import React from "react";
import TaskDelete from "../features/tasks/TaskDelete";
import { useQuery } from "react-query";
import { getTask } from "../services/taskApi";
import { Link } from "react-router-dom";

const TaskRow = ({ taskId, data, refetch }) => {
  const deadlineDate = new Date(data.deadline);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const dateString = deadlineDate
    .toLocaleDateString(undefined, options)
    .replace(/\//g, ".");

  return (
    <div className="grid grid-cols-5 w-full mt-3 rounded-lg bg-gray-300 h-[30px]">
      <div className="col-span-2 lg:col-span-3 flex justify-start items-center border-gray-500 border-r-2">
        <Link className="w-full" to={`/tasks/${taskId}`}>
          <h1 className="text-md font-bold text-blue-800 ml-2 ">
            {data.task_name}
          </h1>
        </Link>
      </div>
      <div className="col-span-2 lg:col-span-1 border-gray-500 border-r-2 flex justify-center items-center text-blue-800">
        <h1>{dateString}</h1>
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <TaskDelete taskId={taskId} size={20} refetch={refetch} />
      </div>
    </div>
  );
};

export default TaskRow;
