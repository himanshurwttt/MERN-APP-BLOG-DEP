import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [formError, setFormError] = useState(null);
  const [formProcess, setFormProcess] = useState(false);
  const navigate = useNavigate();

  const handleHeadingChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleContentChange = (content) => {
    setContent(content);
  };

  const handleImageUpload = () => {
    return new Promise((resolve, reject) => {
      if (image) {
        const storageRef = ref(storage, `posts/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progess =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progess);
          },
          (error) => {
            console.error("Upload error :", error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((url) => {
                resolve(url);
              })
              .catch((error) => {
                reject(error);
              });
          }
        );
      } else {
        resolve();
      }
    });
  };

  const handleSubmit = async (e) => {
    setFormProcess(true);
    e.preventDefault();
    if (!title || !content || title === "" || content === "") {
      setFormError("Sorry , Title and Content are must required");
    }
    try {
      const image = await handleImageUpload();
      const res = await fetch(`/api/post/createpost/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image, title, content }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.message);
        setFormProcess(false);
      } else {
        setFormError(null);
        setFormProcess(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setFormError(error);
      setFormProcess(false);
    }
  };

  return (
    <div className="w-full md:h-screen h-[92vh] p-10 z-10 flex ">
      <div className="max-w-3xl md:w-full m-auto p-5 bg-blue-300 drop-shadow-xl rounded-md h-[80%] my-auto  md:h-full  overflow-hidden md:mt-0  ">
        <h1 className="font-[500] text-4xl underline text-center mb-4 md:mb-0">
          CREATE POST
        </h1>
        <form className="max-w-3xl m-auto flex flex-col items-center   md:gap-4 gap-6">
          <div className="heading  w-full my-3">
            <input
              type="text"
              disabled={formProcess}
              placeholder="BLOG TITLE HERE"
              className="p-1 rounded-md w-full text-center drop-shadow-lg"
              onChange={handleHeadingChange}
            />
          </div>
          <div className="w-full flex flex-row justify-between items-center ">
            <label>Select Image :</label>
            <input
              disabled={formProcess}
              type="file"
              onChange={handleImageChange}
              className="bg-white p-1 rounded-md drop-shadow-lg"
            />
          </div>
          <div className="w-full overflow-hidden h-80 rounded-xl ">
            <ReactQuill
              onChange={handleContentChange}
              theme="snow"
              className="h-[85%] drop-shadow-lg bg-white"
            />
          </div>
          <div className="w-full">
            <button
              type="submit"
              disabled={formProcess}
              onClick={handleSubmit}
              className="bg-blue-900 text-white drop-shadow-md p-1 rounded-md w-full active:scale-[0.99] "
            >
              {formProcess ? "Uploading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
