import React, { useState } from "react";
import { deleteTeam } from "../../services/teamApi";
import { useNavigate } from "react-router-dom";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import { useMutation } from "react-query";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const TeamDelete = ({ id, refetch }) => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { mutate: deleteTeamMutation } = useMutation(() => deleteTeam(id), {
    onSuccess: () => {
      navigate("/teams");
      refetch();
    },
  });

  const handleDelete = () => {
    setModalIsOpen(false);
    deleteTeamMutation();
  };

  return (
    <div className="cursor-pointer">
      <HiOutlineArchiveBoxXMark onClick={() => setModalIsOpen(true)} size={30} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Delete Confirmation"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '20px',
            width: '30%',
            height: '30%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }
        }}
      >
        <div>
          <h2>Confirm Deletion</h2>
          <p>Deleting a team will delete all its projects and tasks. Are you sure you want to delete this team?</p>
        </div>
        <div>
          <button onClick={handleDelete} style={{ marginRight: '10px' }}>Yes, delete it</button>
          <button onClick={() => setModalIsOpen(false)}>No, keep it</button>
        </div>
      </Modal>
    </div>
  );
};

export default TeamDelete;