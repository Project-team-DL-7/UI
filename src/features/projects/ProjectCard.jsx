import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import { deleteProject, getProject } from "../../services/projectsApi";
import Row from "../../ui/Row";
import { HiOutlineTrash } from "react-icons/hi2";

const StyledCard = styled.div`
  border: 2px solid var(--color-grey-100);
  height: 20vh;
  margin-top: 1rem;
`;

const StyledContent = styled.div`
  margin: 1rem 0 0 1rem;
  display: flex;
`;

const StyledHeading = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`;

const StyledRow = styled(Row)`
  padding: 1rem 1rem 0 1rem;
`;

const TrashIcon = styled(HiOutlineTrash)`
  cursor: pointer;
`;

const ProjectCard = () => {
  const {
    data: projects,
    isLoading,
    isError,
    error,
  } = useQuery("projects", async () => {
    const projectsId = [5];
    const projectsData = await Promise.all(
      projectsId.map((id) => getProject(id))
    );
    return projectsData;
  });

  const queryClient = useQueryClient();

  const deleteProjectMutation = useMutation(deleteProject, {
    onSuccess: () => {
      queryClient.invalidateQueries("projects");
    },
  });

  const handleDelete = async (projectId) => {
    try {
      await deleteProjectMutation.mutateAsync(projectId);
      await refetch();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  console.log(projects);
  return (
    <div>
      {projects.map((project) => (
        <StyledCard key={project.id_project}>
          <StyledRow type={"horizontal"}>
            <StyledHeading as={"h2"}>{`${project.id_project}`}</StyledHeading>
            <TrashIcon
              size={25}
              onClick={() => handleDelete(project.id_project)}
            />
          </StyledRow>
          <StyledContent>
            <Heading as={"h3"}>{project.description}</Heading>
          </StyledContent>
        </StyledCard>
      ))}
    </div>
  );
};

export default ProjectCard;
