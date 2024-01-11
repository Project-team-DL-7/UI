import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

const TaskPreview = ({ taskId }) => {
  const { data: task, isLoading } = useQuery(
    ["task", taskId],
    () => getTask(taskId),
    {
      enabled: !!taskId,
    }
  );

  if (!taskId) {
    return <div>Please provide a task ID</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <tr className="bg-gray-50 border-b-[2px] border-gray-200 text-center">
      <td className="p-2 bg-gray-300">{task.id_task}</td>
      <td>
        <h1 className="">{task.task_name}</h1>
      </td>
    </tr>
  );
};

export default TaskPreview;
