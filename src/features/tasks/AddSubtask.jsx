import React, { useState, useContext } from "react";
import Button from "../../ui/Button";
import { createTask } from "../../services/taskApi";
import { useMutation } from "react-query";
import { ProjectContext } from "../../contexts/ProjectContext";
import { useToast } from "../../contexts/ToastContext";
import { MeContext } from "../../contexts/MeContext";

const AddSubTask = ({ setShowModal, refetch, parentTaskId, projectId }) => {
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [status, setStatus] = useState("TO DO");
    const { showToast } = useToast();
    const { projects } = useContext(ProjectContext);
    const { id: userId, username } = useContext(MeContext);
    const [selectedUser, setSelectedUser] = useState(userId);

    const { mutate: createTaskMutation } = useMutation(
        (newTask) => createTask(newTask),
        {
            onSuccess: () => {
                showToast("Subtask created successfully", "success");
                setShowModal(false);
                refetch();
            },
            onError: (error) => {
                showToast(`Error: ${error.message}`, "error");
                setShowModal(false);
            },
        }
    );

    const handleInputChange = (event, setter) => {
        setter(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!taskName.trim()) {
            showToast("Task name cannot be empty", "error");
            return;
        }

        if (!description.trim()) {
            showToast("Description cannot be empty", "error");
            return;
        }

        const deadlineDate = new Date(deadline);
        const currentDate = new Date();

        const deadlineDay = deadlineDate.getUTCDate();
        const deadlineMonth = deadlineDate.getUTCMonth();
        const deadlineYear = deadlineDate.getUTCFullYear();

        const currentDay = currentDate.getUTCDate();
        const currentMonth = currentDate.getUTCMonth();
        const currentYear = currentDate.getUTCFullYear();

        if (deadlineYear < currentYear || (deadlineYear === currentYear && deadlineMonth < currentMonth) || (deadlineYear === currentYear && deadlineMonth === currentMonth && deadlineDay <= currentDay)) {
            showToast("Deadline cannot be today or in the past", "error");
            return;
        }

        if (!deadline) {
            showToast("Deadline cannot be empty", "error");
            return;
        }

        const taskData = {
            task_name: taskName,
            description,
            deadline: deadlineDate.getTime(),
            id_project: Number(projectId),
            id_user: selectedUser,
            status,
            id_parent_task: parentTaskId,
        };

        createTaskMutation(taskData);
    };

    if (projects.length === 0) {
        return (
            <div>
                Loading projects or no projects available, you need to be in a project
                in order to create a subtask
            </div>
        );
    }

    return (
        <form
            className="flex flex-col gap-6 items-center py-12"
            onSubmit={handleSubmit}
        >
            <h1 className="text-3xl mt-5 font-bold shadow-md shadow-gray-100">
                Add Subtask
            </h1>
            <input
                type="text"
                placeholder="Subtask Name"
                className="bg-blue-200 rounded-md text-center inline-block w-full py-3 px-4"
                value={taskName}
                onChange={(event) => handleInputChange(event, setTaskName)}
            />
            <textarea
                type="text"
                placeholder="Description"
                className="bg-blue-200 rounded-md text-center inline-block w-full py-3 px-4 h-[10rem]"
                value={description}
                onChange={(event) => handleInputChange(event, setDescription)}
            />
            <input
                type="date"
                placeholder="Deadline"
                className="bg-blue-200 rounded-md text-center inline-block w-full py-3 px-4"
                value={deadline}
                onChange={(event) => handleInputChange(event, setDeadline)}
            />
            <select
                className="bg-blue-200 rounded-md text-center inline-block w-full py-3 px-4"
                value={selectedUser}
                onChange={(event) => handleInputChange(event, setSelectedUser)}
            >
                <option value={userId}>{username}</option>
            </select>
            <Button text={"Submit"} type="submit" />
        </form>
    );
};

export default AddSubTask;