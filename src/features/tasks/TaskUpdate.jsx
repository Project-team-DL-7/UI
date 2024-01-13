import React, { useState, useContext } from "react";
import { MeContext } from "../../contexts/MeContext";
import { HiPencilAlt } from "react-icons/hi";
import { useMutation } from "react-query";
import { useToast } from "../../contexts/ToastContext";
import Modal from "../../ui/Modal";
import { updateTask } from "../../services/taskApi";
import ReactSelect from 'react-select';

const TaskUpdate = ({ id, id_project, id_user, refetch, originalName, originalDescription, originalDeadline, originalStatus }) => {
    const [showModal, setShowModal] = useState(false);
    const [taskName, setTaskName] = useState(originalName);
    const [description, setDescription] = useState(originalDescription);
    const [deadline, setDeadline] = useState(originalDeadline);
    const [status, setStatus] = useState(originalStatus);
    const { showToast } = useToast();
    const { id: userId, username } = useContext(MeContext);
    const [selectedUser, setSelectedUser] = useState(id_user);
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

    const options = [
        { value: 'TO DO', label: 'TO DO', color: 'blue' },
        { value: 'IN PROGRESS', label: 'IN PROGRESS', color: 'orange' },
        { value: 'DONE', label: 'DONE', color: 'green' },
        { value: 'CLOSED', label: 'CLOSED', color: 'red' },
    ];

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: '#f5f5f5',
            borderColor: '#dcdcdc',
            minHeight: '30px',
            height: '30px',
            boxShadow: 'none'
        }),

        valueContainer: (provided) => ({
            ...provided,
            height: '30px',
            padding: '0 6px'
        }),

        input: (provided) => ({
            ...provided,
            margin: '0px',
        }),

        indicatorsContainer: (provided) => ({
            ...provided,
            height: '30px',
        }),

        option: (provided, { data, isFocused }) => ({
            ...provided,
            backgroundColor: isFocused ? data.color : null,
            color: isFocused ? 'white' : 'black',
        }),

        singleValue: (provided, { data }) => ({
            ...provided,
            color: data.color,
        }),
    };

    const handleSubmit = (e) => {
        e.preventDefault();

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

        const taskData = {
            id_task: Number(id),
            id_project,
            id_user: selectedUser,
            task_name: taskName,
            description,
            deadline: deadlineDate.getTime(),
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
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                    >
                        <option value={userId}>{username}</option>
                    </select>
                    <ReactSelect
                        options={options}
                        styles={customStyles}
                        value={options.find(option => option.value === status)}
                        onChange={(option) => setStatus(option.value)}
                    />
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Update Task</button>
                </form>
            </Modal>
        </div>
    );
};

export default TaskUpdate;