import React, { useState, useContext } from "react";
import Button from "../../ui/Button";
import SubTaskRow from "../../ui/SubtaskRow.jsx";
import Loading from "../../ui/Loading";
import { ProjectContext } from "../../contexts/ProjectContext";
import Modal from "../../ui/Modal";
import AddSubTask from "./AddSubtask.jsx";
import { LuArrowUpDown } from "react-icons/lu";

const SubTask = ({ parentTaskId, projectId, refetch, isTaskLoading }) => {
    const [search, setSearch] = useState("");
    const { tasks } = useContext(ProjectContext);
    const [showModal, setShowModal] = useState(false);
    const [sortOrder, setSortOrder] = useState("asc");

    if (isTaskLoading) return <Loading />;

    // search filter
    const parentTasks = tasks.filter((task) => Number(task.id_parent_task) === Number(parentTaskId));
    const filteredTasks = parentTasks.filter((task) => {
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

    console.log(tasks);
    console.log(parentTaskId, projectId);

    return (
        <div className="border-[2px] border-gray-400 p-2 max-h-[15rem] overflow-y-auto rounded-md my-1">
            <div className="flex w-full justify-between p-4">
                <h1 className="text-xl font-bold text-blue-800">Subtasks</h1>
                <div className="flex gap-4 items-center">
                    <div className="cursor-pointer text-blue-800">
                        <LuArrowUpDown size={20} onClick={toggleSortOrder} />
                    </div>
                    <Button text={"Add SubTask"} onClick={setShowModal} />
                </div>
            </div>
            <input
                placeholder="search"
                className="rounded-md text-center"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {sortedTasks.map((task) => (
                <SubTaskRow
                    taskId={task.id_task}
                    data={task}
                    key={task.id_task}
                    refetch={refetch}
                />
            ))}
            <Modal isVisible={showModal} setIsVisible={setShowModal}>
                <AddSubTask setShowModal={setShowModal} refetch={refetch} parentTaskId={parentTaskId} projectId={projectId} />
            </Modal>
        </div>
    );
};

export default SubTask;