import React, { useEffect, useInsertionEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdCreate, IoMdCheckmark } from "react-icons/io";
import { BiTimeFive } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import moment from "moment";

export default function Comment({ comment, refetchComments, handleDelete }) {
  const { currentUser } = useSelector((state) => state.user);
  const [commentUser, setCommentUser] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [editContent, setEditContent] = useState(comment.content);

  const fetchCommentUsers = async () => {
    try {
      const res = await fetch(`/api/comment/getCommentUser/${comment.userId}`);
      const data = await res.json();
      if (res.ok) {
        setCommentUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      const res = await fetch(`/api/comment/like/${comment._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUser._id }),
      });
      const data = await res.json();

      if (!res.ok) {
        setCommentError(data.message);
      } else {
        refetchComments();
      }
    } catch (error) {
      setCommentError("Something went wrong, please try again later.");
    }
  };
  useEffect(() => {
    fetchCommentUsers();
  }, [comment.userId]);

  const handleEditComment = async () => {
    try {
      const res = await fetch(`/api/comment/edit/${comment._id}`, {
        method: "PUT",
        body: JSON.stringify({
          content: editContent,
          userId: comment.userId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        setCommentError("Can't edit right now!");
      } else {
        setContent(editContent);
        refetchComments();
        setEdit(false);
      }
    } catch (error) {
      console.log(error);
      setCommentError("Can't edit right now!");
    }
  };

  const handleCancelEdit = () => {
    setEditContent(content);
    setEdit(false);
  };

  return (
    <div className="bg-blue-50 shadow-slate-400 shadow-md outline-1 outline-blue-200  m-auto my-4 p-3 rounded-md md:max-w-md md:mx-auto w-full max-w-md ">
      <div className=" mb-2  w-full flex flex-row justify-between items-center">
        <div className="flex  items-center gap-1">
          <img
            src={commentUser.profilePicture}
            alt={commentUser.username}
            className="bg-cover w-8 h-8 rounded-full border-[2px] border-zinc-500 "
          />
          <label className="text-xs italic text-zinc-700">
            {commentUser
              ? `@${commentUser.username.toLowerCase()}`
              : "@abcd1234"}
          </label>
        </div>
        <div className="ago text-xs flex flex-row justify-center items-center gap-1">
          <BiTimeFive className="scale-[1.2] text-zinc-700" />
          {moment(comment.createdAt).fromNow()}
        </div>
      </div>
      <hr />
      {edit ? (
        <textarea
          maxLength={"300"}
          value={editContent}
          className="content px-3 py-2 resize-none focus:outline-[0.1px]    text-xs w-full rounded-md drop-shadow-lg bg-blue-50 text-zinc-600 font-[500] my-4 selection:bg-none"
          onChange={(e) => setEditContent(e.target.value)}
        />
      ) : (
        <div className="content text-xs text-zinc-600 font-[500] my-4 selection:bg-none">
          {comment.content}
        </div>
      )}

      <div className=" py-2 flex justify-between">
        <div className="flex gap-2 ">
          {currentUser && (
            <>
              {comment.likes.includes(currentUser._id) ? (
                <FaHeart
                  onClick={handleLike}
                  className=" cursor-pointer text-red-500 active:scale-[0.95] scale-[1.1] duration-100 "
                />
              ) : (
                <FaRegHeart
                  onClick={handleLike}
                  className=" cursor-pointer  active:scale-[0.95] scale-[1.1] duration-100 "
                />
              )}
            </>
          )}
          <p className="text-xs font-[500] text-zinc-700 selection:bg-none">
            {!currentUser ? (
              <div className="flex flex-row gap-1 justify-normal items-center">
                <FaHeart className="text-red-500 scale-[1.1] duration-100 " />{" "}
                {comment.noOfLikes}
              </div>
            ) : (
              `${comment.noOfLikes}`
            )}
          </p>
        </div>
        <div className="flex gap-2">
          {currentUser && (
            <>
              {currentUser._id === comment.userId &&
                (!edit ? (
                  <IoMdCreate
                    onClick={() => (!edit ? setEdit(true) : setEdit(false))}
                    className="cursor-pointer active:scale-[0.95] scale-[1.1] duration-100"
                  />
                ) : (
                  <IoMdCheckmark
                    onClick={handleEditComment}
                    className="cursor-pointer active:scale-[0.95] text-green-600 scale-[1.3] duration-100"
                  />
                ))}
              {(currentUser._id === comment.userId || currentUser.isAdmin) &&
                (!edit ? (
                  <MdDelete
                    onClick={() => handleDelete(comment._id)}
                    className="cursor-pointer active:scale-[0.95] scale-[1.1] duration-100"
                  />
                ) : (
                  <RxCross2
                    onClick={handleCancelEdit}
                    className="cursor-pointer active:scale-[0.95] scale-[1.1] duration-100"
                  />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
