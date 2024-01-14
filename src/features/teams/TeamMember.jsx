import React from "react";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";

const TeamMember = ({ member, teamId, onRemove }) => {
  const removeMember = async () => {
    try {
      const response = await fetch(`http://localhost:8000/team/${teamId}/remove/${member.id_user}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      });

      if (response.ok) {
        onRemove(member.id_user);
      } else {
        console.error("Error removing team member:", response.statusText);
      }
    } catch (error) {
      console.error("Error removing team member:", error);
    }
  };

  return (
    <div className="mx-4 grid grid-cols-5 items-center justify-items-center border-[1px] border-gray-500 rounded-md mb-1 hover:shadow-md hover:shadow-gray-500">
      <p className="col-span-3">{member.username}</p>
      <div className="justify-self-end col-span-2 mr-3 cursor-pointer" onClick={removeMember}>
        <HiOutlineArchiveBoxXMark size={19} />
      </div>
    </div>
  );
};

export default TeamMember;
