import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const UpdatePost = () => {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [formError, setFormError] = useState(null);
  const [formProcess, setFormProcess] = useState(false);
  const params = useParams();
  const [FetchProcess, setFetchProcess] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
  });

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  useEffect(() => {
    setFetchProcess(true); // Set fetching state to true
    try {
      console.log("Post ID:", params.postId);
      const fetchData = async () => {
        const res = await fetch(`api/post/getpost?postId=${params.postId}`);
        const data = await res.json();

        if (!res.ok) {
          setFetchProcess(false); // Set fetching state to false
          setFormError("something went wrong, please refresh the page");
        } else {
          setFormData(data.post[0]); // Set formData with fetched data
          setFetchProcess(false); // Set fetching state to false
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
      setFetchProcess(false); // Set fetching state to false in case of error
    }
  }, [params.postId]);

  const handleImageUpload = () => {
    console.log("Update started");
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
    if (
      !formData.title ||
      !formData.content ||
      formData.title === "" ||
      formData.content === ""
    ) {
      setFormError("Sorry , Title and Content are must required");
    }
    try {
      console.log(formData.title);
      const image = await handleImageUpload();
      console.log(imageUrl);
      const res = await fetch(`api/post/updatepost/${params.postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image,
          title: formData.title,
          content: formData.content,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setFormError(data.message);
        setFormProcess(false);
        console.log("update filed");
      } else {
        setFormError(null);
        setFormProcess(false);
        navigate("/dashboard?tab=posts");
      }
    } catch (error) {
      console.log(error);
      setFormError(error);
      setFormProcess(false);
    }
  };

  return (
    <div className="w-full md:h-screen h-[92vh] p-10 z-10 flex ">
      {FetchProcess ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-3xl md:w-full m-auto p-5 bg-blue-300 drop-shadow-xl rounded-md h-full my-auto  md:h-full  overflow-hidden md:mt-0  ">
          <h1 className="font-[500] text-4xl underline text-center mb-4 md:mb-0">
            UPDATE POST
          </h1>
          <form className="max-w-3xl m-auto flex flex-col items-center justify-around py-8 h-full ">
            <div className="heading  w-full my-3">
              <input
                type="text"
                disabled={formProcess}
                placeholder="BLOG TITLE HERE"
                className="p-1 rounded-md w-full text-center drop-shadow-lg"
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                }}
                value={FetchProcess ? "" : formData.title}
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
                value={formData && formData.content}
                onChange={(content) => {
                  setFormData({ ...formData, content: content });
                }}
                theme="snow"
                className="h-[85%] drop-shadow-lg bg-white"
              />
            </div>
            <div className="w-full">
              <button
                type="submit"
                value={formData.content}
                disabled={formProcess}
                onClick={handleSubmit}
                className="bg-blue-900 text-white drop-shadow-md p-1 rounded-md w-full active:scale-[0.99] "
              >
                {formProcess ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdatePost;
