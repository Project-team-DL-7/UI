import React, { useState } from "react";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import { useMutation, useQueryClient } from "react-query";
import { deleteTask } from "../../services/taskApi";

import Modal from 'react-modal';

const TaskDelete = ({ taskId, size, refetch }) => {
  const queryClient = useQueryClient();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const mutation = useMutation(() => deleteTask(taskId), {
    onSuccess: () => {
      showToast("Task deleted successfully", "success");
      refetch();
      setModalIsOpen(false);
    },

    onError: (error) => {
      showToast(`Error: ${error.message}`, "error");
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <div>
      <HiOutlineArchiveBoxXMark
        className="text-blue-800 cursor-pointer"
        size={size}
        onClick={() => setModalIsOpen(true)}
      />
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
            width: '50%', 
            height: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }
        }}
      >
        <div>
          <p>Are you sure you want to delete this task?</p>
        </div>
        <div>
          <button onClick={handleDelete} style={{ marginRight: '10px' }}>Yes, delete it</button>
          <button onClick={() => setModalIsOpen(false)}>No, keep it</button>
        </div>
      </Modal>
    </div>
  );
};

export default TaskDelete;