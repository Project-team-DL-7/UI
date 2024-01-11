import React from "react";
import TaskDelete from "../tasks/TaskDelete";
import { Link } from "react-router-dom";

const DashBoardTask = ({ taskId, data }) => {
  const deadlineDate = new Date(data.deadline);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const dateString = deadlineDate
    .toLocaleDateString(undefined, options)
    .replace(/\//g, ".");

  return (
    <div className="grid grid-cols-2 w-full mt-3 rounded-lg bg-gray-300 h-[30px] justify-items-center">
      <div className="col-span-2 md:col-span-1 flex justify-center md:justify-start items-center ">
        <Link className="w-full" to={`/tasks/${taskId}`}>
          <h1 className="text-md font-bold text-blue-800 ">{data.task_name}</h1>
        </Link>
      </div>
      <div className="hidden md:flex items-center">
        <h1 className="font-bold">{dateString}</h1>
      </div>
    </div>
  );
};

export default DashBoardTask;
