import { useParams } from "react-router-dom";
import { useContext } from "react";
import Box from "../../ui/Box";
import ProjectDelete from "./ProjectDelete";
import ProjectUpdate from "./ProjectUpdate"; // Import the ProjectUpdate component
import TeamProjectCard from "../teams/TeamProjectCard";
import TaskProjectCard from "../tasks/TaskProjectCard";
import { ProjectContext } from "../../contexts/ProjectContext";
import Loading from "../../ui/Loading";

const ProjectDetail = () => {
  const { id } = useParams();
  const { projects, refetchProjects, isProjectsLoading } =
    useContext(ProjectContext);

  if (isProjectsLoading) return <Loading />;

  const project = projects.find((project) => project.id_project === Number(id));

  return (
    <Box>
      <div className="flex justify-between p-3">
        <h1 className="text-3xl font-bold  text-blue-800 self-start ml-[10%]">
          {project ? project.name : ""}
        </h1>
        <div className="flex gap-3">
          <ProjectUpdate
            id={id}
            refetch={refetchProjects}
            originalName={project.name}
            originalDescription={project.description}
          />
          <ProjectDelete id={id} refetch={refetchProjects} />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col my-4 gap-8 w-[90%] md:flex-row md:h-[28rem]">
          <div className="h-[15rem] border-gray-400 border-[2px] rounded-md shadow-gray-500 shadow-md md:w-[50%] md:h-[100%] overflow-auto">
            <TeamProjectCard />
          </div>
          <div className="h-[15rem] border-gray-400 border-[2px] rounded-md shadow-gray-500 shadow-md md:w-[50%] md:h-[100%] overflow-auto">
            <TaskProjectCard />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default ProjectDetail;
