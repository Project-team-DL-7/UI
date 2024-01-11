import React, { createContext, useContext } from "react";
import { toast } from "react-toastify";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const showToast = (message, type = "default") => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      default:
        toast(message);
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
