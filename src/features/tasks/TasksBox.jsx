import React, { useState } from "react";
import Modal from "../../ui/Modal";
import Task from "./Task";

const TasksBox = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="h-full p-4 ">
      <h1 className="flex w-full justify-center text-3xl font-bold text-blue-800">
        Tasks
      </h1>
      <div className="grid grid-cols-1 auto-rows-auto mt-5">
        <Task />
      </div>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        {/* <CreateProjectForm setShowModal={setShowModal} /> */}
      </Modal>
    </div>
  );
};

export default TasksBox;
