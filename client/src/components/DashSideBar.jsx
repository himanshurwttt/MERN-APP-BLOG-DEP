import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOutSuccess } from "../redux/user/userSlice";
import { IoCreateOutline } from "react-icons/io5";
export default function Component() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });
      if (res.ok) {
        localStorage.removeItem("token");
        dispatch(signOutSuccess());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className=" flex  mx-1 md:flex-col  md:h-[90vh] bg-blue-950 rounded-lg
     text-white z-50"
    >
      <div className="md:flex hidden items-center h-16 px-4 border-b border-gray-800">
        <Link className="flex items-center gap-2 text-lg font-[500] ">
          <span className="">BLOG</span>
        </Link>
      </div>
      <nav className="flex-1 py-4 ">
        <ul className="space-y-1 flex flex-row md:flex-col w-full justify-around">
          {/* <li>
            <Link
              className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-800 active:bg-blue-700 rounded-lg w-full h-full"
              to={"/dashboard?tab=dashboardComp"}
            >
              <LayoutDashboardIcon className="w-5 h-5" />
              <span className="hidden md:inline">dashboard</span>
            </Link>
          </li> */}
          {currentUser.isAdmin == true && (
            <li>
              <Link
                className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-800 active:bg-blue-700 rounded-lg w-full h-full"
                to={"/createpost"}
              >
                <IoCreateOutline className="w-5 h-5" />
                <span className="hidden md:inline">Create post</span>
              </Link>
            </li>
          )}

          <li>
            <Link
              className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-800 active:bg-blue-700 rounded-lg w-full h-full"
              to={"/dashboard?tab=users"}
            >
              <UsersIcon className="w-5 h-5" />
              <span className="hidden md:inline">Users</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-800 active:bg-blue-700 rounded-lg w-full h-full"
              to={"/dashboard?tab=posts"}
            >
              <FileTextIcon className="w-5 h-5" />
              <span className="hidden md:inline">Posts</span>
            </Link>
          </li>

          <li>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-800 active:bg-blue-700 rounded-lg w-full h-full"
            >
              <LogOutIcon className="w-5 h-5" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function FileTextIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function LogOutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
function LayoutDashboardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
