import { useParams } from "react-router-dom";
import { useContext } from "react";
import Box from "../../ui/Box";
import ProjectDelete from "./ProjectDelete";
import TeamProjectCard from "../teams/TeamProjectCard";
import TaskProjectCard from "../tasks/TaskProjectCard";
import { ProjectContext } from "../../contexts/ProjectContext";

const ProjectDetail = () => {
  const { id } = useParams();
  const { projects, refetch } = useContext(ProjectContext);

  return (
    <Box>
      <div className="flex justify-end p-3">
        <ProjectDelete id={id} refetch={refetch} />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold  text-blue-800 self-start ml-[10%]">
          Project id: {id}
        </h1>
        <div className="flex flex-col my-4 gap-8 w-[90%] md:flex-row md:h-[28rem]">
          <div className="h-[15rem] border-gray-400 border-[2px] rounded-md shadow-gray-500 shadow-md md:w-[50%] md:h-[100%] overflow-auto">
            {/* <TeamProjectCard /> */}
          </div>
          <div className="h-[15rem] border-gray-400 border-[2px] rounded-md shadow-gray-500 shadow-md md:w-[50%] md:h-[100%] overflow-auto">
            {/* <TaskProjectCard /> */}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default ProjectDetail;
