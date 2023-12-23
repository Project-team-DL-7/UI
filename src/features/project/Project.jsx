import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProject } from "../../services/projectApi";
import { useQuery } from "react-query";

const Project = ({ projectId }) => {
  const {
    data: project,
    isLoading,
    isError,
    refetch,
  } = useQuery(["project", projectId], () => getProject(projectId), {
    refetchInterval: 1000,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching project</div>;
  }

  return (
    <Link to={`/projects/${projectId}`} className="text-black">
      <div className="cursor-pointer border-2 border-gray-400 rounded-md max-h-[12rem] overflow-y-auto max-w-[15rem] shadow-md shadow-gray-400 hover:shadow-gray-700 flex flex-col items-center md:min-h-[9rem]">
        <h1 className="text-xl font-bold mt-2">{project.id_project}</h1>
        <p className="self-start p-2 whitespace-normal">
          {project.description}
        </p>
      </div>
    </Link>
  );
};

export default Project;