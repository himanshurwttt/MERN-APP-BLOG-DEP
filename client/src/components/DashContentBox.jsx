import React, { useState } from "react";
import { IoCreate } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import Modal from "./Modal";

export default function DashContentBox({ post, refetchPosts }) {
  const shouldPrefetch = true;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="max-w-lg flex md:h-64 h-64 flex-row bg-blue-50 drop-shadow-lg rounded-lg overflow-hidden mx-2 md:mx-0 my-2">
        <div className="w-2/5 flex-shrink-0">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-6 flex flex-col justify-between ">
          <div className="mb-2 w-full  text-blue-gray-700 md:text-2xl text-lg text-ellipsis font-bold head capitalize md:h-36 h-28 overflow-hidden cursor-pointer duration-300 ">
            {post.title}
          </div>
          <div className="mb-4 md:max-w-64 max-w-52  text-gray-500 overflow-hidden md:h-28 h-24 p-1 ">
            {ReactHtmlParser(post.content)}
          </div>
          <div className="flex w-52 md:w-full  justify-between text-xs md:text-sm  gap-1">
            <Link
              to={`/posts/${post.slug}`}
              prefetch={shouldPrefetch ? "true" : undefined}
            >
              <button className="flex items-center gap-2 text-blue-800 hover:underline">
                Read
                <FaArrowRight />
              </button>
            </Link>
            <Link
              to={`/updatepost/${post._id}`}
              prefetch={shouldPrefetch ? "true" : undefined}
            >
              <button className="flex items-center gap-2 text-blue-800 hover:underline">
                Update
                <IoCreate />
              </button>
            </Link>
            <button
              className="flex items-center gap-2 text-blue-800 hover:underline"
              onClick={openModal}
            >
              Delete
              <MdDelete />
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        postId={post._id}
        refetchPosts={refetchPosts}
      />
    </>
  );
}
