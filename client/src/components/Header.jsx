import React, { useEffect, useRef, useState } from "react";
import { CgFormatJustify } from "react-icons/cg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useClickOutside from "../hooks/useClickOutSide"; // Adjust the import path as necessary
import { signOutSuccess } from "../redux/user/userSlice";

export default function Header() {
  const shouldPrefetch = true;
  const navigate = useNavigate();
  const [showbox, setShowbox] = useState(false);
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const buttonRef = useRef(null);
  const boxRef = useRef();
  const dashBoxRef = useRef();
  const [showdashBox, setShowdashBox] = useState(false);
  const dispatch = useDispatch();
  const handleClickOutside = (event) => {
    if (
      (showbox || showdashBox) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target) &&
      (boxRef.current || dashBoxRef.current) &&
      !(boxRef.current && dashBoxRef.current) &&
      !(boxRef.current || dashBoxRef.current).contains(event.target)
    ) {
      setShowbox(false);
      setShowdashBox(false);
    }
  };

  useEffect(() => {
    // Add the listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remove the listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleHamburg = () => {
    if (!showbox) {
      setShowbox(true);
    } else {
      setShowbox(false);
    }
  };

  const handleLinkShow = () => {
    setShowbox(false);
  };

  const handleCloseBoxes = () => {
    setShowbox(false);
    setShowdashBox(false);
  };

  // Define a combined ref for both elements
  const combinedRefs = [boxRef, dashBoxRef];

  // Use the custom hook with the combined refs
  useClickOutside([handleCloseBoxes], combinedRefs);

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
        setShowdashBox(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileBox = () => {
    setShowdashBox(false);
  };

  return (
    <>
      <nav className="w-full text-sm p-1 justify-center items-center max-w-screen-2xl mx-auto relative z-50 ">
        <div className="h-16 bg-blue-900 shadow-2xl border border-blue-900 rounded-2xl flex justify-between items-center ">
          <div className="left">
            <Link to={"/"} prefetch={shouldPrefetch ? "true" : undefined}>
              <div className="logo px-5 font-bold text-white">BLOGS</div>
            </Link>
          </div>

          <div className="right flex gap-2 px-2 sm:px-6 relative items-center">
            <div className="hidden md:flex">
              <ul className="flex gap-10 text-white font-sans mx-5">
                {/* <li> */}
                <Link to={"/"} prefetch={shouldPrefetch ? "true" : undefined}>
                  Home
                </Link>
                {/* </li> */}
                {/* <li> */}
                <Link
                  to={"/about"}
                  prefetch={shouldPrefetch ? "true" : undefined}
                >
                  About
                </Link>
                {/* </li> */}
                {/* <li> */}
                <Link
                  to={"/posts"}
                  prefetch={shouldPrefetch ? "true" : undefined}
                >
                  posts
                </Link>
                {/* </li> */}
                {/* <li> */}
                {currentUser && (
                  <Link
                    to={"/dashboard?tab=profile"}
                    prefetch={shouldPrefetch ? "true" : undefined}
                  >
                    Profile
                  </Link>
                )}
                {/* </li> */}
              </ul>
            </div>
            {location.pathname === "/signin" || location.pathname === "/signup"
              ? ""
              : currentUser && (
                  <div className="w-10 h-10 mx-2 flex flex-col rounded-full bg-red-400">
                    <img
                      onClick={() => setShowdashBox(!showdashBox)}
                      className="rounded-full object-cover border-[2px] border-gray-500"
                      src={currentUser.profilePicture}
                      alt={currentUser.username}
                    />
                    {showdashBox ? (
                      <div
                        ref={dashBoxRef}
                        className=" w-auto  rounded-lg absolute top-14 right-8 md:right-5 bg-blue-800 text-white mx-auto p-2 flex flex-col gap-3"
                      >
                        <div>
                          <p className="text-xs">{currentUser.username}</p>
                          <p className="text-xs md:text-xs font-bold">
                            {currentUser.email}
                          </p>
                        </div>
                        <div className="flex flex-col text-xs font-[500] gap-1">
                          {currentUser.isAdmin && (
                            <Link to={"/dashboard?tab=profile"}>
                              <p
                                onClick={handleProfileBox}
                                prefetch={shouldPrefetch ? "true" : undefined}
                                className="p-1 py-2 rounded-md hover:bg-white hover:text-black duration-200"
                              >
                                Dashboard
                              </p>
                            </Link>
                          )}

                          <Link>
                            <p
                              onClick={handleSignOut}
                              prefetch={shouldPrefetch ? "true" : undefined}
                              className="p-1 py-2 rounded-md hover:bg-white hover:text-black duration-200"
                            >
                              sign out
                            </p>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                )}
            {currentUser ? (
              ""
            ) : location.pathname === "/signin" ? (
              <Link
                to={"/signup"}
                prefetch={shouldPrefetch ? "true" : undefined}
              >
                <button className="border active:scale-[0.9] shadow-md border-white text-white w-20 h-10 rounded-lg md:hover:bg-white md:hover:text-black duration-300">
                  Sign Up
                </button>
              </Link>
            ) : (
              <Link
                to={"/signin"}
                prefetch={shouldPrefetch ? "true" : undefined}
              >
                <button className="border active:scale-[0.9] shadow-md border-white text-white w-20 h-10 rounded-lg md:hover:bg-white md:hover:text-black duration-300">
                  Sign In
                </button>
              </Link>
            )}

            <div className="md:hidden">
              <button
                ref={buttonRef}
                className="border p-1 rounded-full active:scale-[0.9] w-10 h-10 flex justify-center items-center text-white md:hover:bg-white md:hover:text-black duration-300"
                onClick={handleHamburg}
              >
                <CgFormatJustify className="w-6 h-6" />
              </button>
              {showbox && (
                <ul
                  ref={boxRef}
                  className="absolute flex right-0 top-12 mt-4 rounded-2xl bg-blue-900 text-white text-lg w-28 min-h-9 px-2  items-center gap-2 p-1 flex-col"
                >
                  <li onClick={handleLinkShow} className="p-1">
                    <Link
                      to={"/"}
                      prefetch={shouldPrefetch ? "true" : undefined}
                    >
                      Home
                    </Link>
                  </li>
                  <li onClick={handleLinkShow} className="p-1">
                    <Link
                      to={"/about"}
                      prefetch={shouldPrefetch ? "true" : undefined}
                    >
                      About
                    </Link>
                  </li>
                  <li onClick={handleLinkShow} className="p-1">
                    <Link
                      to={"/posts"}
                      prefetch={shouldPrefetch ? "true" : undefined}
                    >
                      posts
                    </Link>
                  </li>
                  {currentUser && (
                    <li onClick={handleLinkShow} className="p-1">
                      <Link
                        to={"/dashboard?tab=profile"}
                        prefetch={shouldPrefetch ? "true" : undefined}
                      >
                        Profile
                      </Link>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
