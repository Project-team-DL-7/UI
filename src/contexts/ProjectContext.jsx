import React, { createContext } from "react";
import { useQuery } from "react-query";

export const ProjectContext = createContext();

const fetchProjects = async () => {
  const response = await fetch("http://localhost:8000/project/1");
  return response.json();
};

export const ProjectContextProvider = ({ children }) => {
  const {
    data: projects,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery("projects", fetchProjects);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error("Error fetching projects:", error);
    return <div>Error fetching projects</div>;
  }

  return (
    <ProjectContext.Provider value={{ projects, refetch }}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
