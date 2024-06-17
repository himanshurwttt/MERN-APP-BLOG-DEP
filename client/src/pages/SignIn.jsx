import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { auth, provider } from "../firebase"; // Import from your firebase.js file
import { signInWithRedirect, getRedirectResult } from "firebase/auth";

const SignIn = () => {
  const [type, setType] = useState("password");
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState(null);
  const dispatch = useDispatch();
  const boxRef = useRef();
  const navigate = useNavigate();
  const [signInProcess, setSignInProcess] = useState(false);

  const handleOnChnage = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.email === "" ||
      formData.password === "" ||
      !formData.email ||
      !formData.password
    ) {
      setFormError("All Fields are required");
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        navigate("/");
        setFormError(null);
        dispatch(signInSuccess(data));
        console.log(data);
      } else {
        setFormError(data.message || "An unknown error occurred.");
        dispatch(signInFailure(data.message || "An unknown error occurred."));
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      setFormError(error.message);
    }
  };

  useGSAP(() => {
    gsap.from(boxRef.current, {
      scale: 0.9,
      duration: 0.2,
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Error during sign-in redirect:", error);
    }
  };

  const fetchUserData = async (user) => {
    setSignInProcess(true);
    try {
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
        }),
      });

      if (!response.ok) {
        setSignInProcess(false);
        throw new Error("Failed to send user data");
      }
      const data = await response.json();
      if (response.ok) {
        dispatch(signInSuccess(data)); // Assuming signInSuccess handles both existing and new users
        navigate("/");
        setSignInProcess(false);
      }
    } catch (error) {
      setSignInProcess(false);
      console.error("Error sending user data:", error);
    }
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          const user = result.user;
          fetchUserData(user);
        }
      })
      .catch((error) => {
        console.error("Error getting redirect result:", error);
      });
  }, [navigate, dispatch]);

  return (
    <div className="w-full h-[92vh]">
      <div className=" w-full h-full p-4 px-10 sm:py-5 py-16 ">
        <h1 className="text-6xl text-center font-bold">BLOGS</h1>
        <div ref={boxRef} className="flex justify-around  max-w-4xl mx-auto ">
          <div className="box w-full sm:w-[50%]">
            <form
              onSubmit={handleSubmit}
              className="w-full border mt-6 border-white bg-blue-50 mx-auto flex flex-col gap-6   drop-shadow-2xl rounded-2xl sm:rounded-r-none p-5"
            >
              <h2 className=" text-center text-3xl font-[500] text-gray-700">
                SIGN IN
              </h2>
              <div className="flex flex-col gap-3">
                <label htmlFor="">Email:</label>
                <input
                  id="email"
                  onChange={handleOnChnage}
                  className="rounded-md px-4 drop-shadow-md  p-[0.35rem]"
                  placeholder="abc@xyz.com"
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col gap-3 drop-shadow-md">
                <label htmlFor="">password:</label>
                <div className="flex items-center">
                  <input
                    id="password"
                    onChange={handleOnChnage}
                    type={type}
                    className="rounded-md w-full px-4 p-[0.35rem]"
                    placeholder="**************"
                  />
                  <button
                    onClick={() => {
                      type === "password"
                        ? setType("text")
                        : setType("password");
                    }}
                    type="button"
                    className="absolute right-4"
                  >
                    {type === "password" ? (
                      <BiSolidHide className="h-12 w-5" />
                    ) : (
                      <BiSolidShow className="h-12 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="btns mt-5 flex flex-col gap-3">
                <button
                  disabled={signInProcess}
                  type="submit"
                  onClick={handleSubmit}
                  className="border active:scale-[0.9] h-10 rounded-xl bg-blue-600 text-white shadow-xl  duration-300"
                >
                  submit
                </button>
                <button
                  onClick={handleGoogleLogin}
                  className="border h-10 active:scale-[0.9]  rounded-xl bg-blue-200 border-blue-200 shadow-lg duration-300 flex items-center justify-center gap-1 text-sm "
                >
                  <FcGoogle className="w-6 h-6" />
                  <p> signin with google</p>
                </button>
              </div>
              <p className="text-sm">
                don't have an account?{" "}
                <Link className="text-blue-600" to={"/signup"}>
                  SignUp
                </Link>
              </p>
            </form>
          </div>
          <div className="box hidden sm:flex  w-[50%]">
            <div className=" border mt-6 border-white  mx-auto py-[127px] bg-blue-700 text-white rounded-r-2xl   flex flex-col gap-6 w-full p-8">
              <h1 className="text-center md:text-6xl text-4xl font-[500]">
                WELCOME BACK
              </h1>
              <div className="text-center ">
                <p>Lets continue the journey</p>
                <p>That you started</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
