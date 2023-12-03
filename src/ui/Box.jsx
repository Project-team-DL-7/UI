import React from "react";

const Box = ({ children }) => {
  return (
    <div className="row-span-5 m-8 rounded-md bg-gray-200 shadow-xl shadow-gray-500 overflow-y-auto col-span-4 lg:col-span-3 lg:mt-4 lg:ml-4 lg:mr-8 lg:mb-8 ">
      {children}
    </div>
  );
};

export default Box;
