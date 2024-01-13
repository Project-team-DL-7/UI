import React, { useState } from "react";
import { updateProject } from "../../services/projectApi";
import { HiPencilAlt } from "react-icons/hi";
import { useMutation } from "react-query";
import Modal from "../../ui/Modal";
import { useToast } from "../../contexts/ToastContext";

const ProjectUpdate = ({ id, refetch, originalName, originalDescription }) => {
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState(originalDescription);
  const [name, setName] = useState(originalName);
  const { showToast } = useToast();

  const mutation = useMutation(
    () => updateProject({ id_project: id, description, name }),
    {
      onSuccess: () => {
        refetch();
        showToast("Project updated successfully", "success");
        setShowModal(false);
      },
      onError: (error) => {
        showToast(`Error: ${error.message}`, "error");
        setShowModal(false);
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate();
  };

  return (
    <div>
      <HiPencilAlt size={30} onClick={() => setShowModal(true)} />
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <form className="flex flex-col items-center gap-3" onSubmit={handleSubmit}>
          <h1 className="text-xl font-bold">Update Project</h1>
          <input
            type="text"
            placeholder="Project Name"
            className="w-full text-center bg-blue-200 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            type="text"
            className="w-full text-center bg-blue-200 rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Update Project</button>
        </form>
      </Modal>
    </div>
  );
};

export default ProjectUpdate;
