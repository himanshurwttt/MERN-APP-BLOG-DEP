import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
export default function UpdateProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [username, setUsername] = useState(currentUser.username);
  const [bio, setBio] = useState(currentUser.bio);
  const [bioLength, setBioLength] = useState("");
  const [formError, setFormError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(currentUser.profilePicture);
  const [userData, setUserData] = useState({ username: "", bio: "" });
  const imagePickRef = useRef();
  const [progress, setProgress] = useState(0);
  const [updateProcess, setUpdateProcess] = useState(false);
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUserNameChnage = (e) => {
    const value = e.target.value;
    setUsername(value.replace(/\s/g, ""));
  };
  const handleBioChange = (e) => {
    setBio(e.target.value);
    setBioLength(e.target.value);
  };

  const handleImageUpload = () => {
    return new Promise((resolve, reject) => {
      if (image) {
        const storageRef = ref(storage, `images/${image.name}`);
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
        resolve(currentUser.profilePicture);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateProcess(true);
    if (!username || username == "") {
      setFormError("username field can't be empty");
      return;
    }
    try {
      const profilePicture = await handleImageUpload();
      const res = await fetch(`api/user/updateUser/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, bio, profilePicture }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.message);
        setUpdateProcess(false);
      } else {
        dispatch(updateUserSuccess(data));
        setFormError(null);
        navigate("/dashboard?tab=profile");
        setUpdateProcess(false);
      }
    } catch (error) {
      setUpdateProcess(false);
      console.log(error);
    }
  };

  return (
    <div className="w-full ">
      <div className="w-full  h-[82vh] sm:h-full flex justify-center ">
        <form onSubmit={handleSubmit} className="box w-full p-2 md:w-[70%]">
          <h1 className="font-[500] text-4xl text-center uppercase underline text-gray-600">
            Update Profile
          </h1>
          <div className="img rounded-full my-5 flex justify-center items-center ">
            <input
              type="file"
              accept="image/*"
              ref={imagePickRef}
              onChange={handleImageChange}
              hidden
            />
            <img
              onClick={() => imagePickRef.current.click()}
              src={imageUrl}
              alt={currentUser.username}
              className="rounded-full w-32 h-32 border-blue-900 border-[5px] object-cover cursor-pointer"
            />
          </div>
          <div className="inputs flex flex-col gap-5 my-10">
            <div className=" flex flex-col gap-5 md:flex-row">
              <div className="username flex flex-col gap-2 w-full ">
                <label className="font-[500]">UserName :</label>
                <input
                  type="text"
                  value={username}
                  id="username"
                  onChange={handleUserNameChnage}
                  className="lowercase w-full p-1 rounded-md px-6 drop-shadow-xl focus:outline-none "
                />
              </div>
              <div className="email flex flex-col gap-2 w-full">
                <label className="font-[500]">Email :</label>
                <input
                  type="text"
                  value={currentUser.email}
                  className="w-full p-1 rounded-md focus:outline-none px-6 drop-shadow-xl "
                  readOnly
                />
              </div>
            </div>
            <div className="bio flex flex-col gap-2">
              <label className="font-[500]">Bio :</label>
              <textarea
                maxLength={"180"}
                value={bio}
                id="bio"
                onChange={handleBioChange}
                className="w-full p-1 rounded-md px-6 h-28 drop-shadow-xl resize-none focus:outline-none "
              />
              <p className="text-xs text-gray-400">
                {" "}
                {180 - bioLength.length} characters remaining
              </p>
            </div>

            {formError && (
              <p className="border border-red-500 p-1 rounded-md">
                {formError}
              </p>
            )}
          </div>
          <div className="buttons flex flex-col md:flex-row gap-5">
            <div className="update w-full">
              <button
                disabled={updateProcess}
                className="w-full  font-[500] text-white bg-blue-800 p-3 shadow-lg rounded-full active:scale-[0.98   ] duration-100 drop-shadow-xl focus:outline-none"
              >
                {updateProcess ? "Updating...." : "Update"}
              </button>
            </div>
          </div>
          <div className="moreOpt"></div>
          <div className="lastPost"></div>
        </form>
      </div>
    </div>
  );
}
