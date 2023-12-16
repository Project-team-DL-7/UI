import React from "react";
import Button from "../../ui/Button";
import TaskRow from "../../ui/TaskRow";

const Task = ({ showModal }) => {
  return (
    <div className="border-[2px] border-gray-400 p-2 max-h-[15rem] overflow-y-auto rounded-md my-1">
      <div className="flex w-full justify-between p-4">
        <h1 className="text-xl font-bold text-blue-800">Project Name</h1>
        <Button text={"Add Task"} onClick={showModal} />
      </div>
      <input placeholder="Search" className="bg-white rounded-md text-center" />
      <TaskRow taskId={11} />
      <TaskRow taskId={11} />
    </div>
  );
};

export default Task;
