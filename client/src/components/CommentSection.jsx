import React, { useEffect, useReducer, useState } from "react";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function CommentSection({ postId }) {
  const [comment, setComment] = useState("");
  const [formError, setFormError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [postComments, setPostComments] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length == 0) {
      setFormError("comment should not be empty");
    }
    try {
      const res = await fetch(`/api/comment/create/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: comment,
          postId,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        setFormError("Unable to post , please Try again");
      }
      if (res.ok) {
        setComment("");
        setFormError(null);
        setPostComments((prevComments) =>
          [...prevComments, data].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comment/getComments/${postId}`);
      const data = await res.json();
      if (res.ok) {
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPostComments(data);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const refetchComments = () => {
    fetchComments();
  };

  const handleDelete = async (commentId) => {
    try {
      const res = await fetch(`/api/comment/delete/${commentId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPostComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );
      } else {
        const data = await res.json();
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" h-full max-w-lg m-auto my-3">
        <h1 className="text-center text-5xl uppercase font-[500] text-zinc-800 mb-10">
          Comments
        </h1>
        <div className="flex flex-col  w-full items-end justify-center mt-5">
          {currentUser ? (
            <form
              onSubmit={handleSubmit}
              className="w-full md:px-8 px-5 flex flex-col  gap-2 "
            >
              <textarea
                type="text"
                maxLength="300"
                className="m-auto w-full h-28  text-zinc-600 font-[500] p-3 italic  focus:outline-none text-xs rounded-md resize-none hover:shadow-2xl duration-200 hover:shadow-blue-300 shadow-lg"
                placeholder="Write a comment here.."
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                required
              />

              <div className="flex flex-row justify-between items-center">
                <p className="text-xs text-zinc-600 italic font-[400]">
                  Character Remaning: {300 - comment.length}
                </p>
                <button
                  onClick={handleSubmit}
                  className="hover:bg-green-400 duration-200   self-end shadow-lg border-green-300 bg-green-200 w-20 h-9 text-sm font-[500] rounded-md scale-[1] active:scale-[0.90]"
                >
                  Submit
                </button>
              </div>
              {formError && (
                <p className="text-xs text-red-600 italic font-[400] bg-red-200 p-1 rounded-md w-full">
                  {formError}
                </p>
              )}
            </form>
          ) : (
            <p className="text-zinc-800  text-sm text-center  font-[400] w-full md:px-8 px-5 ">
              Sign In first to make a Comment{" "}
              <Link
                to={"/signin"}
                className="text-blue-600 underline font-[500]"
              >
                {" "}
                sing in
              </Link>
            </p>
          )}
        </div>
      </div>
      <div className="w-full md:px-8 px-5 flex flex-col mt-10">
        {postComments.length > 0 ? (
          postComments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              refetchComments={refetchComments}
              handleDelete={() => handleDelete(comment._id)}
            />
          ))
        ) : (
          <p className="bg-blue-50 shadow-slate-400 shadow-md outline-1 outline-blue-200  m-auto my-4 p-3 rounded-md md:max-w-md md:mx-auto w-full max-w-md text-slate-700 font-[500] ">
            No Comments Yet...
          </p>
        )}
      </div>
    </>
  );
}
