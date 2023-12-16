import React from "react";
import { Link } from "react-router-dom";
import { getProject } from "../../services/projectApi";
import { useQuery } from "react-query";
const DashBoardProject = ({ projectId }) => {
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
    <Link to={`/projects/${projectId}`} className="text-black ">
      <div className="min-w-[8rem] md:min-w-[12rem] border-2 border-gray-400 rounded-md p-2 min-h-[6rem] col-span">
        <h1 className="flex justify-center font-bold text-xl">
          {project.id_project}
        </h1>
        <p className="flex justify-center my-2">name</p>
      </div>
    </Link>
  );
};

export default DashBoardProject;
