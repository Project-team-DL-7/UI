import React, { useState } from "react";
import { updateTeam } from "../../services/teamApi";
import { HiPencilAlt } from "react-icons/hi";
import { useMutation } from "react-query";
import Modal from "react-modal";
import { useToast } from "../../contexts/ToastContext";

Modal.setAppElement("#root");

const TeamUpdate = ({ id, refetch, originalName, originalDescription }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [description, setDescription] = useState(originalDescription);
  const [name, setName] = useState(originalName);
  const { showToast } = useToast();

  const { mutate } = useMutation(
    () => updateTeam({ id_team: id, description, team_name: name }),
    {
      onSuccess: () => {
        refetch();
        showToast("Team updated successfully", "success");
        setModalIsOpen(false);
      },
      onError: (error) => {
        showToast(`Error: ${error.message}`, "error");
        setModalIsOpen(false);
      },
    }
  );

  const handleUpdate = (event) => {
    event.preventDefault();
    mutate();
  };

  return (
    <div className="cursor-pointer">
      <HiPencilAlt onClick={() => setModalIsOpen(true)} size={30} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Update Team"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "20px",
            width: "30%",
            height: "40%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        <div>
          <h2 style={{ textAlign: "center" }}>Update Team</h2>
          <form
            onSubmit={handleUpdate}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ padding: "5px", border: "1px solid #ccc" }}
              />
            </label>
            <label
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              Description:
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ padding: "5px", border: "1px solid #ccc" }}
              />
            </label>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="submit"
                style={{
                  padding: "5px",
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  width: "fit-content",
                }}
              >
                Update
              </button>
              <button
                onClick={() => setModalIsOpen(false)}
                style={{
                  padding: "5px",
                  backgroundColor: "#6c757d",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  width: "fit-content",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default TeamUpdate;
