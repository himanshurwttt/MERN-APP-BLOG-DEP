import React from "react";
import { formatDistanceToNow } from "date-fns";
import { AiTwotoneDelete } from "react-icons/ai";
export default function DashUserComp({ user, deleteUser }) {
  return (
    <div className="group rounded-lg p-1 py-3 border bg-[#f8f8ff] border-[#f8f8ff] flex flex-col items-center justify-between gap-5 drop-shadow-lg">
      <img
        src={user.profilePicture}
        alt={user.username}
        className=" w-20 h-20 rounded-full object-cover"
      />
      <div className="flex flex-col text-center">
        <div className="font-medium">{user.username}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {user.email}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Joined {formatDistanceToNow(new Date(user.createdAt))} ago
        </div>
      </div>
      <button className="md:opacity-0 md:group-hover:opacity-100 duration-300 text-black">
        <AiTwotoneDelete
          className="text-2xl"
          onClick={() => deleteUser(user._id)}
        />
      </button>
    </div>
  );
}
