import React from "react";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";

const TeamMember = ({ memberId }) => {
  return (
    <div className="flex items-center gap-2">
      <HiOutlineArchiveBoxXMark size={19} />
      <p>Member</p>
    </div>
  );
};

export default TeamMember;
