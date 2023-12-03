import React, { useState } from "react";
import Box from "../ui/Box";
import { useQuery } from "react-query";
import { getProject } from "../services/projectApi";
import Project from "../features/project/Project";
import Button from "../ui/Button";

const Dashboard = () => {
  const [projectId, setProjectId] = useState("");
  const { data, isLoading, isError, refetch } = useQuery(
    ["project", projectId],
    () => getProject(projectId),
    {
      enabled: false,
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectId.trim() !== "") {
      refetch();
    }
  };

  if (isLoading) {
    return (
      <Box>
        <p className="flex flex-col h-full items-center justify-center text-3xl font-bold">
          Loading...
        </p>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box>
        <div className="flex flex-col h-full items-center justify-center ">
          <p className="text-3xl font-bold">Error fetching project</p>
          <button onClick={() => setProjectId("")}>&larr; Go back</button>
        </div>
      </Box>
    );
  }

  return (
    <Box>
      <div className="flex flex-col items-center h-full justify-center gap-5">
        <form onSubmit={handleSubmit} className="flex gap-4 ">
          <input
            type="text"
            placeholder="Enter Project ID"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="bg-blue-200 rounded-md text-center"
          />
        </form>
        {data ? (
          <Project projectId={projectId} />
        ) : (
          <p>Please enter a valid project ID</p>
        )}
      </div>
    </Box>
  );
};

export default Dashboard;
