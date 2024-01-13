import React, { useState, useContext } from "react";
import Button from "../../ui/Button";
import TaskRow from "../../ui/TaskRow";
import Loading from "../../ui/Loading";
import { ProjectContext } from "../../contexts/ProjectContext";
import Modal from "../../ui/Modal";
import AddTask from "./AddTask";
import { LuArrowUpDown } from "react-icons/lu";

const Task = ({ projectId, refetch, isTaskLoading }) => {
  const [search, setSearch] = useState("");
  const { tasks, projects } = useContext(ProjectContext);
  const [showModal, setShowModal] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  if (isTaskLoading) return <Loading />;

  // project name filter
  const project = projects.find((project) => project.id_project === projectId);
  // search filter
  const projectTasks = tasks.filter((task) => {
    return task.id_project === projectId && task.id_parent_task === null;
  });
  const filteredTasks = projectTasks.filter((task) => {
    return task.task_name.toLowerCase().includes(search.toLowerCase());
  });

  // Sort tasks by deadline
  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.deadline) - new Date(b.deadline);
    } else {
      return new Date(b.deadline) - new Date(a.deadline);
    }
  });

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="border-[2px] border-gray-400 p-2 max-h-[15rem] overflow-y-auto rounded-md my-1">
      <div className="flex w-full justify-between p-4">
        <h1 className="text-xl font-bold text-blue-800">{project.name}</h1>
        <div className="flex gap-4 items-center">
          <div className="cursor-pointer text-blue-800">
            <LuArrowUpDown size={20} onClick={toggleSortOrder} />
          </div>
          <Button text={"Add Task"} onClick={setShowModal} />
        </div>
      </div>
      <input
        placeholder="search"
        className="rounded-md text-center"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {sortedTasks.map((task) => (
        <TaskRow
          taskId={task.id_task}
          data={task}
          key={task.id_task}
          refetch={refetch}
        />
      ))}
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <AddTask
          refetch={refetch}
          setShowModal={setShowModal}
          projectId={projectId}
        />
      </Modal>
    </div>
  );
};

export default Task;
