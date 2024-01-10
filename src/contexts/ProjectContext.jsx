import React, { createContext } from "react";
import { useQuery } from "react-query";

export const ProjectContext = createContext();

const fetchProjects = async () => {
  const response = await fetch("http://localhost:8000/project/1");
  return response.json();
};

const fetchTeams = async () => {
  const response = await fetch("http://localhost:8000/team/1");
  return response.json();
};

const fetchTasks = async () => {
  const response = await fetch("http://localhost:8000/task/1");
  return response.json();
};

export const ProjectContextProvider = ({ children }) => {
  const {
    data: projects,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
    error: projectsError,
    refetch: refetchProjects,
  } = useQuery("projects", fetchProjects);

  const {
    data: teams,
    isLoading: isTeamsLoading,
    isError: isTeamsError,
    error: teamsError,
    refetch: refetchTeams,
  } = useQuery("teams", fetchTeams);

  const {
    data: tasks,
    isLoading: isTasksLoading,
    isError: isTasksError,
    error: tasksError,
    refetch: refetchTasks,
  } = useQuery("tasks", fetchTasks);

  if (isProjectsLoading || isTeamsLoading || isTasksLoading) {
    return <div>Loading...</div>;
  }

  if (isProjectsError || isTeamsError || isTasksError) {
    console.error(
      "Error fetching data:",
      projectsError,
      teamsError,
      tasksError
    );
    return <div>Error fetching data</div>;
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        refetchProjects,
        teams,
        refetchTeams,
        tasks,
        refetchTasks,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
