import React from "react";
import Button from "../../ui/Button";

const AddTeamMember = () => {
  const users = ["test1", "test2", "test3", "test4", "test5"];

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col items-center mt-16 gap-4 h-[16rem]">
      <h1 className="text-xl font-bold text-blue-700">Add Team Member</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <select className="text-center bg-blue-200 rounded-md w-[10rem]">
          {users.map((user, index) => (
            <option key={index} value={user}>
              {user}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-600 hover:bg-blue-500">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTeamMember;
