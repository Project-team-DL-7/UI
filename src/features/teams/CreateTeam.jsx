import React from "react";
import Button from "../../ui/Button";
import { useState } from "react";
import Modal from "../../ui/Modal";
import CreateTeamForm from "./CreateTeamForm";

const CreateTeam = () => {
  const [modal, setModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setModal(!modal)}>Create Team</Button>
      {modal && (
        <Modal onClose={() => setModal(false)}>
          <CreateTeamForm onClose={() => setModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default CreateTeam;
