import CreateProject from "../features/projects/CreateProject";
import ProjectCards from "../features/projects/ProjectBlock";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Projects = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as={"h1"}>Projects</Heading>
        <CreateProject />
      </Row>
      <Row>
        <ProjectCards />
      </Row>
    </>
  );
};

export default Projects;
