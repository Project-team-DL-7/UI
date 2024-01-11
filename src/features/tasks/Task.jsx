import React, { useState } from "react";
import Button from "../../ui/Button";
import TaskRow from "../../ui/TaskRow";
import Loading from "../../ui/Loading";

const Task = ({ showModal, tasks, refetch, isTaskLoading }) => {
  const [search, setSearch] = useState("");

  if (isTaskLoading) return <Loading />;

  const filteredTasks = tasks.filter((task) => {
    return task.task_name.includes(search);
  });

  return (
    <div className="border-[2px] border-gray-400 p-2 max-h-[15rem] overflow-y-auto rounded-md my-1">
      <div className="flex w-full justify-between p-4">
        <h1 className="text-xl font-bold text-blue-800">Project Name</h1>
        <Button text={"Add Task"} onClick={showModal} />
      </div>
      <input
        placeholder="search"
        className="rounded-md text-center"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredTasks.map((task) => (
        <TaskRow
          taskId={task.id_task}
          data={task}
          key={task.id_task}
          refetch={refetch}
        />
      ))}
    </div>
  );
};

export default Task;
