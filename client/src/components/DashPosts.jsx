import React, { useEffect, useState } from "react";
import DashContentBox from "./DashContentBox";
import LoadingSpinner from "./LoadingSpinner";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
export default function DashPosts() {
  const [posts, setPosts] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [fetchProcess, setFetchProcess] = useState(false);
  const [index, setIndex] = useState(0);

  const fetchData = async () => {
    setFetchProcess(true);
    try {
      const res = await fetch("api/post/getpost?startIndex=0");
      const data = await res.json();
      if (!res.ok) {
        console.log("something went wrong");
        setFetchError(
          "Something went wrong please try again or 'Referesh the page'"
        );
        setFetchProcess(false);
      } else {
        // console.log(data.post.slug);
        setPosts(data.post);
        setFetchProcess(false);
      }
    } catch (error) {
      setFetchProcess(false);
      console.log("An error occurred:", error);
    }
  };

  const refetchPosts = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleShowMore = async () => {
    setFetchProcess(true);
    try {
      const res = await fetch(`api/post/getpost?startIndex=${index + 8}`);
      const data = await res.json();
      if (res.ok) {
        setPosts(data.post);
        setFetchProcess(false);
        setIndex(index + 8);
      } else {
        setFetchProcess(false);
        setFetchError(
          "Something went wrong please try again or 'Referesh the page'"
        );
      }
    } catch (error) {
      setFetchProcess(false);
      setFetchError(
        "Something went wrong please try again or 'Referesh the page'"
      );
    }
  };

  const showPrev = async () => {
    setFetchProcess(true);
    try {
      const newIndex = Math.max(index - 8, 0); // Ensure index does not go below 0
      const res = await fetch(`api/post/getpost?startIndex=${newIndex}`);
      const data = await res.json();
      if (res.ok) {
        setFetchProcess(false);
        setPosts(data.post);
        setIndex(newIndex); // Update the index
      } else {
        setFetchProcess(false);
        setFetchError(
          "Something went wrong please try again or 'Refresh the page'"
        );
      }
    } catch (error) {
      setFetchProcess(false);
      setFetchError(
        "Something went wrong please try again or 'Refresh the page'"
      );
    }
  };
  return (
    <div className="w-full max-w-screen-xl h-[90vh] flex flex-col gap-2  z-10 p-3 md:p-6 lg:p-8">
      <div className=" flex flex-wrap w-full justify-around h-full overflow-y-auto custom-scrollbar ">
        {fetchProcess
          ? <LoadingSpinner /> || (
              <h1 className="font-[500]"> No Post Available</h1>
            )
          : posts.map((post) => (
              <DashContentBox
                post={post}
                key={post._id}
                refetchPosts={refetchPosts}
              />
            ))}
      </div>
      <div className="w-full flex flex-row justify-center items-center gap-3">
        <button
          onClick={showPrev}
          disabled={index == 0}
          className="flex flex-row justify-center items-center gap-2  bg-blue-800 rounded-md p-1 text-white text-sm font-[400] px-2 drop-shadow-lg"
        >
          <FaArrowLeft /> previous
        </button>
        <button
          disabled={posts.length < 8}
          onClick={handleShowMore}
          className="flex flex-row justify-center items-center gap-2 bg-blue-800 rounded-md py-1 text-white text-sm font-[400] px-2 drop-shadow-lg"
        >
          show more <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
