import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOutSuccess } from "../redux/user/userSlice";

export default function DashProfile() {
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.removeItem("token");
        dispatch(signOutSuccess());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/deleteuser/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/");
        dispatch(signOutSuccess());
        handleSignOut();
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full m-auto h-[90vh] ">
      <div className="w-full  m-auto h-full  flex justify-center ">
        <div className="box w-full p-2 md:w-[70%]">
          <div className="img   rounded-full my-5 flex justify-center items-center ">
            <img
              src={currentUser.profilePicture}
              alt={currentUser.username}
              className="rounded-full w-32 h-32 border-blue-900 border-[5px] object-cover cursor-pointer"
            />
          </div>
          <div className="inputs flex flex-col gap-5 my-10">
            <div className=" flex flex-col gap-5 md:flex-row">
              <div className="username flex flex-col gap-2 w-full ">
                <label className="font-semibold">UserName :</label>
                <input
                  type="text"
                  value={currentUser.username}
                  className="w-full p-1 rounded-md px-6 drop-shadow-xl focus:outline-none hover:cursor-default"
                  readOnly
                />
              </div>
              <div className="email flex flex-col gap-2 w-full">
                <label className="font-semibold">Email :</label>
                <input
                  type="text"
                  value={currentUser.email}
                  className="w-full p-1 rounded-md focus:outline-none px-6 drop-shadow-xl hover:cursor-default"
                  readOnly
                />
              </div>
            </div>
            <div className="bio flex flex-col gap-2">
              <label className="font-semibold">Bio :</label>
              <textarea
                maxLength={"180"}
                value={currentUser.bio}
                className="w-full p-1 rounded-md px-6 h-28 drop-shadow-xl resize-none focus:outline-none hover:cursor-default"
                readOnly
              />
            </div>
            <div className="flex justify-end">
              <Link
                onClick={() => setDeleteModal(true)}
                className="text-red-600 font-[500] text-sm"
              >
                Delete Account?
              </Link>
            </div>
            {deleteModal && (
              <div className="  max-w-xs w-full m-auto p-2 rounded-md bg-gray-100 drop-shadow-lg">
                <p className="text-lg text-center font-[500]">Are You sure?</p>
                <div className="flex flex-row gap-2 justify-center mt-3">
                  <button
                    onClick={() => setDeleteModal(false)}
                    className="bg-gray-600 text-white py-1 rounded-md drop-shadow-md px-3"
                  >
                    cancel
                  </button>
                  <button
                    onClick={handleDeleteUser}
                    className="bg-red-500 text-white py-1 rounded-md drop-shadow-md px-3"
                  >
                    Yes
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="buttons flex flex-col md:flex-row gap-5">
            <div className="update w-full">
              <Link to={"/dashboard?tab=updateprofile"}>
                <button className="w-full  font-semibold text-white bg-blue-800 p-3 shadow-lg rounded-full active:scale-[0.95] duration-100 drop-shadow-xl focus:outline-none">
                  Update
                </button>
              </Link>
            </div>
            <div className="signout w-full">
              <button
                onClick={handleSignOut}
                className="w-full  font-semibold text-white bg-red-600 p-3 shadow-lg rounded-full active:scale-[0.95] duration-100 drop-shadow-xl focus:outline-none"
              >
                Sign Out
              </button>
            </div>
          </div>
          <div className="moreOpt"></div>
          <div className="lastPost"></div>
        </div>
      </div>
    </div>
  );
}
