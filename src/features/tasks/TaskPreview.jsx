import React from "react";

const TaskPreview = ({ data }) => {
  return (
    <div className="col-span-3 grid mx-3 border-[1px] border-gray-500 rounded-md grid-cols-3 hover:shadow-md hover:shadow-gray-400 hover:cursor-pointer">
      <h1 className="text-center col-span-2 border-r-[1px] border-gray-500">
        Test
      </h1>
      <h1 className="text-center">Deadline</h1>
    </div>
  );
};

export default TaskPreview;
