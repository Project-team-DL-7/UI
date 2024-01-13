import React, { useContext } from "react";
import Box from "../ui/Box";
import DashBoardProject from "../features/project/DashBoardProject";
import DashBoardTeam from "../features/teams/DashBoardTeam";
import DashBoardTask from "../features/tasks/DashBoardTask";
import { ProjectContext } from "./../contexts/ProjectContext";
import Loading from "../ui/Loading";

const Dashboard = () => {
  const {
    projects,
    teams,
    tasks,
    isTaskLoading,
    isTeamLoading,
    isProjectsLoading,
  } = useContext(ProjectContext);

  if (isProjectsLoading || isTeamLoading || isTaskLoading) return <Loading />;
  if (!projects || !teams || !tasks) return <Loading />;

  const tasksLenght = tasks.length;
  const displayTasks = tasksLenght > 4 ? 4 : tasksLenght;

  const projectLenght = projects.length;
  const displayProjects = projectLenght > 10 ? 10 : projectLenght;

  const teamLenght = teams.length;
  const displayTeams = teamLenght > 2 ? 2 : teamLenght;

  return (
    <Box>
      <div className="grid grid-cols-2 auto-rows-auto">
        <div className="col-span-2 flex justify-center p-4 text-4xl font-bold text-blue-800">
          <h1>Dashboard</h1>
        </div>
        <div className="mx-2 py-2 border-2 border-gray-500 rounded-md p-2 min-h-[12rem]">
          <h1 className="flex justify-center text-blue-800 font-bold text-xl">
            Tasks
          </h1>

          {/* Tasks */}
          <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-4 max-h-[12rem] overflow-y-auto">
            {Array.from({ length: displayTasks }, (_, i) => (
              <DashBoardTask
                taskId={tasks[i].id_task}
                name={tasks[i].name}
                data={tasks[i]}
                key={tasks[i]}
              />
            ))}
          </div>
        </div>
        <div className="mx-2 py-2 border-2 border-gray-500 rounded-md p-2">
          <h1 className="flex justify-center text-blue-800 font-bold text-xl">
            Teams
          </h1>

          {/*  Teams */}
          <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-4 max-h-[12rem] overflow-y-auto">
            {Array.from({ length: displayTeams }, (_, i) => (
              <DashBoardTeam
                teamId={teams[i].id_team}
                name={teams[i].name}
                data={teams[i]}
                key={teams[i].id_team}
              />
            ))}
          </div>
        </div>
        <div className="col-span-2 mx-2 mt-4 mb-2 py-2 border-2 border-gray-500 rounded-md p-2 min-h-[25rem] md:min-h-[18rem]">
          <h1 className="flex justify-center text-blue-800 font-bold text-xl mb-2">
            Projects
          </h1>

          {/* projects */}
          <div className="flex gap-12 flex-wrap justify-center">
            {Array.from({ length: displayProjects }, (_, i) => (
              <DashBoardProject
                projectId={projects[i].id_project}
                name={projects[i].name}
                data={projects[i]}
                key={projects[i].id_project}
              />
            ))}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Dashboard;
