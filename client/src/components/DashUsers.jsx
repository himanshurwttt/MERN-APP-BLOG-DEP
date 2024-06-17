import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import DashUserComp from "./DashUserComp";
import { Link } from "react-router-dom";

export default function dashUsers() {
  const [users, setUsers] = useState([]);
  const [fetchProcess, setFetchProcess] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);
  const fetchUsers = async () => {
    try {
      setFetchProcess(true);
      const res = await fetch("/api/user/getUsers");
      const data = await res.json();
      if (!res.ok) {
        setFetchProcess(false);
        setFetchError(data.message);
      } else {
        setFetchProcess(false);
        setUsers(Array.isArray(data.users) ? data.users : []);
      }
    } catch (error) {
      setFetchError("Please Relogin again");
      setFetchProcess(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const res = await fetch(`/api/user/deleteuser/${userId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorAlert("someting went wrong , try again");
        console.log(data.message);
      } else {
        setUsers(users.filter((prev) => prev._id != userId));
      }
    } catch (error) {
      setErrorAlert("something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[90vh] p-4 sm:p-5 md:p-6 max-h-[90vh]">
      {fetchError && (
        <p className="font-[500] text-2xl">
          {fetchError}{" "}
          <Link
            to={"/signin"}
            onClick={setFetchError(null)}
            className="underline text-blue-700"
          >
            Login?
          </Link>{" "}
        </p>
      )}
      <div className=" w-full h-full grid gap-6 sm:grid-cols-2   md:grid-cols-3 lg:grid-cols-4  px-10 py-2 overflow-y-auto  custom-scrollbar">
        {fetchProcess ? (
          <LoadingSpinner />
        ) : (
          users.map((user) => (
            <DashUserComp
              user={user}
              key={user._id}
              deleteUser={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
