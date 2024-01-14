import React, { useState } from "react";

const AddTeamMember = ({ id_team }) => {
  const [id, setid] = useState(""); // State to hold the entered id
  const [users, setUsers] = useState([]); // State to store added users

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (id.trim() === "") {
      return; // Do not proceed if the id is empty
    }

    // Send a POST request to the backend endpoint using id_team
    try {
      const response = await fetch(`http://localhost:8000/team/${id_team}/invite/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type as needed
          credentials: "include",
        },
        // body: JSON.stringify({ id_team, id }),
      });

      if (response.ok) {
        setUsers([...users, id]); // Add the id to the users array
        setid(""); // Clear the input field
      } else {
        console.error("Error inviting user:", response.statusText);
      }
    } catch (error) {
      console.error("Error inviting user:", error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-16 gap-4 h-[16rem]">
      <h1 className="text-xl font-bold text-blue-700">Add Team Member</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          value={id}
          onChange={(e) => setid(e.target.value)}
          placeholder="Enter id"
          className="text-center bg-blue-200 rounded-md w-[10rem]"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-500">
          Add
        </button>
      </form>
      <div>
        <h2>Added Team Members:</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddTeamMember;
