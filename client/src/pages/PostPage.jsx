import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import CommentSection from "../components/CommentSection";
import LoadingSpinner from "../components/LoadingSpinner";

export default function PostPage() {
  const { slug } = useParams();
  const [fetchError, setFetchError] = useState(null);
  const [postData, setPostData] = useState(null);
  console.log(slug);
  useEffect(() => {
    try {
      const fetchData = async () => {
        try {
          const res = await fetch(`/api/post/getpost?slug=${slug}`);
          const data = await res.json();

          if (!res.ok) {
            setFetchError("something went wrong please try again");
          } else {
            setFetchError(null);
            setPostData(data.post[0]);
          }
        } catch (error) {
          console.error(error);
        }
      };
      if (slug) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  }, [slug]);

  return (
    <div className="w-full m-auto  h-full p-3">
      {postData ? (
        <div className="max-w-6xl  m-auto ">
          <h1 className="text-6xl text-center font-[500] my-5 font-serif  max-w-4xl m-auto ">
            {postData.title}
          </h1>
          <div className="img  max-w-4xl h-64 md:min-h-[500px] rounded-xl overflow-hidden m-auto shadow-xl">
            <img
              src={postData.image}
              alt={postData.title}
              className="object-cover w-full h-full rou"
            />
          </div>
          <div className="content  text-wrap overflow-x-scroll  sm:max-w-5xl max-w-full m-auto prose prose-lg my-20 ">
            {ReactHtmlParser(postData.content)}
          </div>
          <CommentSection postId={postData._id} />
        </div>
      ) : (
        <LoadingSpinner />
      )}
      {fetchError && <p>{fetchError}</p>}
      <footer className="flex flex-col gap-2 sm:flex-row py-8 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          &copy; 2024 Acme Blog. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <p
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </p>
          <p
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </p>
        </nav>
      </footer>
    </div>
  );
}
