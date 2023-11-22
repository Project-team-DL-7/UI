import { useState } from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateProjectForm from "./CreateProjectForm";

const CreateProject = () => {
  const [modal, setModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setModal(!modal)}>Create Project</Button>
      {modal && (
        <Modal onClose={() => setModal(false)}>
          <CreateProjectForm onClose={() => setModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default CreateProject;
