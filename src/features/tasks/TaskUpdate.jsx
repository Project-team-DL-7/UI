import React, { useState } from "react";
import { HiPencilAlt } from "react-icons/hi";
import { useMutation } from "react-query";
import { useToast } from "../../contexts/ToastContext";
import Modal from "../../ui/Modal";
import { updateTask } from "../../services/taskApi";

const TaskUpdate = ({ id, id_project, id_user, refetch, originalName, originalDescription, originalDeadline, originalStatus }) => {
    const [showModal, setShowModal] = useState(false);
    const [taskName, setTaskName] = useState(originalName);
    const [description, setDescription] = useState(originalDescription);
    const [deadline, setDeadline] = useState(originalDeadline);
    const [status, setStatus] = useState(originalStatus);
    const { showToast } = useToast();

    const mutation = useMutation(updateTask, {
        onSuccess: () => {
            setShowModal(false);
            refetch();
            showToast("Task updated successfully", "success");
        },
        onError: (error) => {
            showToast(`Error: ${error.message}`, "error");
            setShowModal(false);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const taskData = { 
            id_task: Number(id), 
            id_project, 
            id_user, 
            task_name: taskName, 
            description, 
            deadline: new Date(deadline).getTime(),
            status 
        };
        mutation.mutate(taskData);
    };

    return (
        <div>
            <HiPencilAlt size={30} onClick={() => setShowModal(true)} />
            <Modal isVisible={showModal} setIsVisible={setShowModal}>
                <form className="flex flex-col items-center gap-3" onSubmit={handleSubmit}>
                    <h1 className="text-xl font-bold">Update Task</h1>
                    <input
                        type="text"
                        placeholder="Task Name"
                        className="w-full text-center bg-blue-200 rounded-md"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                    <textarea
                        type="text"
                        className="w-full text-center bg-blue-200 rounded-md"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="date"
                        className="w-full text-center bg-blue-200 rounded-md"
                        value={new Date(deadline).toISOString().split('T')[0]}
                        onChange={(e) => setDeadline(new Date(e.target.value).getTime())}
                    />
                    <select
                        className="w-full text-center bg-blue-200 rounded-md"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="TO DO">TO DO</option>
                        <option value="IN PROGRESS">IN PROGRESS</option>
                        <option value="DONE">DONE</option>
                        <option value="CLOSED">CLOSED</option>
                    </select>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Update Task</button>
                </form>
            </Modal>
        </div>
    );
};

export default TaskUpdate;