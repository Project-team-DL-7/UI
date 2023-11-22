import React from "react";
import Button from "../../ui/Button";
import { useState } from "react";
import Modal from "../../ui/Modal";
import CreateTaskForm from "./CreateTaskForm";

const CreateTask = () => {
  const [modal, setModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setModal(!modal)}>Create Task</Button>
      {modal && (
        <Modal onClose={() => setModal(false)}>
          <CreateTaskForm onClose={() => setModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default CreateTask;
