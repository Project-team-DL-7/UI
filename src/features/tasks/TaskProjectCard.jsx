import React from "react";
import TaskPreview from "./TaskPreview";

const TaskProjectCard = () => {
  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-xl font-bold text-blue-800 mb-3">Tasks</h1>
      </div>
      <div className="grid grid-cols-2 auto-rows-auto">
        <table className="col-span-2 mx-2">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="p-2 bg-gray-300">id</th>
              <th className="p-2">name</th>
            </tr>
          </thead>
          <tbody>
            <TaskPreview taskId={1} />
            <TaskPreview taskId={2} />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TaskProjectCard;
