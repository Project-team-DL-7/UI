import React from "react";
import { Link, useParams } from "react-router-dom";
import Box from "../../ui/Box";
import { getTask } from "../../services/taskApi";
import { useQuery } from "react-query";
import TaskDelete from "./TaskDelete";

const TaskDetail = () => {
  const { id } = useParams();
  console.log(id);

  const { data, isLoading, isError } = useQuery(["task", id], () =>
    getTask(id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data || !data.deadline) {
    return <div>Error fetching task or missing deadline</div>;
  }

  const deadlineDate = new Date(data.deadline);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const dateString = deadlineDate
    .toLocaleDateString(undefined, options)
    .replace(/\//g, ".");

  return (
    <Box>
      <div className="flex flex-col items-center">
        <div className="flex w-full justify-between items-center px-2">
          <h1 className="p-3 text-4xl font-bold text-blue-800 ">
            {data.task_name}
          </h1>
          <Link to={`/tasks`}>
            <TaskDelete size={30} taskId={id} />
          </Link>
        </div>
      </div>
      <div className="flex flex-col mx-4 my-4 gap-3">
        <div className="flex max-h-[12rem] items-center">
          <p className="text-xl font-bold text-blue-800">Project Id:</p>
          <p className="overflow-wrap-normal max-h-[10rem] overflow-y-auto ml-10 font-bold">
            {data.id_project}
          </p>
        </div>
        <div className="flex max-h-[12rem] items-center">
          <p className="text-xl font-bold text-blue-800">Description:</p>
          <p className="overflow-wrap-normal max-h-[10rem] overflow-y-auto ml-5">
            {data.description}
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-xl font-bold text-blue-800">Deadline: </p>
          <p className="ml-12 font-bold">{dateString}</p>
        </div>
      </div>
    </Box>
  );
};

export default TaskDetail;
