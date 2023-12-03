import React from "react";
import Button from "./Button";

const Modal = ({ isVisible, setIsVisible, children }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") {
      setIsVisible(false);
    }
  };

  return (
    <div
      id="wrapper"
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="w-[80%] flex-col flex md:w-[50%]">
        <Button
          text={"X"}
          className="text-xl m-2 place-self-end bg-gray-400 hover:bg-gray-500 shadow-gray-500"
          onClick={() => setIsVisible(false)}
        />
        <div className="bg-white p-2 rounded-md">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
