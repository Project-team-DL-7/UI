import { useQuery } from "react-query";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import { getProject } from "../../services/projectsApi";

const StyledContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 23vh;
  padding: 1rem;
  gap: 2rem;
`;

const StyledComponent = styled.div`
  border: 2px solid var(--color-grey-100);
  padding: 1rem;
`;

const ProjectContent = () => {
  const {
    data: projects,
    isLoading,
    isError,
    error,
  } = useQuery("projects", async () => {
    const projectsId = [5, 12, 13];
    const projectsData = await Promise.all(
      projectsId.map((id) => getProject(id))
    );
    return projectsData;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <Heading as={"h2"}>Projects</Heading>
      <StyledContent>
        {projects.map((project) => (
          <StyledComponent>
            <Heading as={"h3"}>{project.id_project}</Heading>
            <p>{project.description}</p>
          </StyledComponent>
        ))}
      </StyledContent>
    </div>
  );
};

export default ProjectContent;
