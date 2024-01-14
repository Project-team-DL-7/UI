import React, { useState } from "react";

const AddTeamMember = ({ teamId }) => {
  const [username, setUsername] = useState(""); // State to hold the entered username
  const [users, setUsers] = useState([]); // State to store added users
  const [error, setError] = useState(null); // State to store error message

  const handleSubmit = async (event) => {
    console.log('teamId:', teamId);
    event.preventDefault();

    if (username.trim() === "") {
      return; // Do not proceed if the username is empty
    }

    // Fetch the user ID associated with the entered username
    let userId;
    try {
      const response = await fetch(`http://localhost:8000/user/username/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Set the content type as needed
        },
        credentials: 'include', // Include credentials
      });

      if (response.ok) {
        userId = await response.json();
      } else {
        console.error("Error fetching user ID:", response.statusText);
        setError("Username doesn't exist");
        return;
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
      setError("An error occurred while fetching user ID");
      return;
    }

    // Send a POST request to the backend endpoint using teamId
    try {
      const response = await fetch(`http://localhost:8000/team/${teamId}/invite/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type as needed
        },
        credentials: 'include', // Include credentials
        // You can include a request body if required
        // body: JSON.stringify({ teamId, userId }),
      });

      if (response.ok) {
        setUsers([...users, username]); // Add the username to the users array
        setUsername(""); // Clear the input field
        setError(null); // Clear the error message
      } else {
        console.error("Error inviting user:", response.statusText);
        setError("An error occurred while inviting user");
      }
    } catch (error) {
      console.error("Error inviting user:", error);
      setError("An error occurred while inviting user");
    }
  };

  return (
    <div className="flex flex-col items-center mt-16 gap-4 h-[16rem]">
      <h1 className="text-xl font-bold text-blue-700">Add Team Member</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="text-center bg-blue-200 rounded-md w-[10rem]"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-500">
          Add
        </button>
        {error && <p className="text-red-500">{error}</p>}
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