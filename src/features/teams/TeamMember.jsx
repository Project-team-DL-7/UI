import React from "react";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";

const TeamMember = ({ memberId }) => {
  return (
    <div className="grid grid-cols-5 items-center justify-items-center border-[1px] border-gray-500 rounded-md mb-1 hover:shadow-md hover:shadow-gray-500">
      <p className="col-span-3">Member</p>
      <div className="justify-self-end col-span-2 mr-3 cursor-pointer">
        <HiOutlineArchiveBoxXMark size={19} />
      </div>
    </div>
  );
};

export default TeamMember;
