import React, { createContext } from "react";
import { useQuery } from "react-query";
import { getProjects, getTasks, getTeams } from "../services/userApi";

export const ProjectContext = createContext();

export const ProjectContextProvider = ({ children }) => {
  const {
    data: projects,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
    error: projectsError,
    refetch: refetchProjects,
  } = useQuery("projects", getProjects);

  const {
    data: teams,
    isLoading: isTeamLoading,
    isError: isTeamError,
    error: teamError,
    refetch: refetchTeam,
  } = useQuery("teams", getTeams);

  const {
    data: tasks,
    isLoading: isTaskLoading,
    isError: isTaskError,
    error: taskError,
    refetch: refetchTask,
  } = useQuery("tasks", getTasks);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        isProjectsLoading,
        isProjectsError,
        projectsError,
        refetchProjects,
        teams,
        isTeamLoading,
        isTeamError,
        teamError,
        refetchTeam,
        tasks,
        isTaskLoading,
        isTaskError,
        taskError,
        refetchTask,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
