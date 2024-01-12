import React from "react";
import { Link } from "react-router-dom";

const TaskPreview = ({ data }) => {
  const date = new Date(data.deadline);
  const formattedDate = `${date.getDate()}.${
    date.getMonth() + 1
  }.${date.getFullYear()}`;

  return (
    <Link to={`/tasks/${data.id_task}`} className="col-span-3 cursor-pointer">
      <div className="grid mx-3 border-[1px] border-gray-500 rounded-md grid-cols-3 hover:shadow-md hover:shadow-gray-400 ">
        <h1 className="text-center col-span-2 border-r-[1px] border-gray-500">
          {data.task_name}
        </h1>
        <h1 className="text-center">{formattedDate}</h1>
      </div>
    </Link>
  );
};

export default TaskPreview;
