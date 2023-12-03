import React from "react";
import Button from "../../ui/Button";

const Task = () => {
  return (
    <div className="border-[2px] border-gray-400 p-2 max-h-[15rem] overflow-y-auto rounded-md">
      <div className="flex w-full justify-between p-4">
        <h1 className="text-xl font-bold text-blue-800">Project Name</h1>
        <Button text={"Add Task"} />
      </div>
      <input
        placeholder="Search"
        className="bg-blue-200 rounded-md text-center"
      />
      <table></table>
    </div>
  );
};

export default Task;
