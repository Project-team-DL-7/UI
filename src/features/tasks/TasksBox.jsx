import React, { useState } from "react";
import Modal from "../../ui/Modal";
import Task from "./Task";
import CreateTask from "./CreateTask";

const TasksBox = () => {
  const [showModal, setShowModal] = useState(false);

  function handleModal() {
    setShowModal(true);
  }

  return (
    <div className="h-full p-4 ">
      <h1 className="flex w-full justify-center text-3xl font-bold text-blue-800">
        Tasks
      </h1>
      <div className="grid grid-cols-1 auto-rows-auto mt-5">
        <Task showModal={handleModal} />
        <Task showModal={handleModal} />
      </div>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <CreateTask projectId={1} />
      </Modal>
    </div>
  );
};

export default TasksBox;
