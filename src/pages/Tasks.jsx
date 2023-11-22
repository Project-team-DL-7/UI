import CreateTask from "../features/tasks/CreateTask";
import TaskBlock from "../features/tasks/TaskBlock";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Tasks = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as={"h1"}>Tasks</Heading>
        <CreateTask />
      </Row>
      <Row>
        <TaskBlock />
      </Row>
    </>
  );
};

export default Tasks;
