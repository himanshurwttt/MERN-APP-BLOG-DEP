import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ContentBox({ post }) {
  return (
    <div className="bg-blue-300  mt-2 md:w-72 w-[48%] h-80 rounded-xl p-2 flex flex-col gap-1 justify-between overflow-hidden shadow-slate-400 hover:drop-shadow-lg hover:shadow-slate-400 duration-300 shadow-sm m-auto scale-[1]">
      <div className="img w-full h-40  rounded-lg overflow-hidden">
        <div className="img w-full h-40 rounded-lg shadow-xl hover:scale-[1.1] duration-200 object-cover">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <Link to={`/posts/${post.slug}`}>
        <div className="head capitalize w-full h-12 font-[500] overflow-hidden text-ellipsis hover:underline cursor-pointer duration-300">
          {post.title}
        </div>
      </Link>
      <div className="btn w-full h-10">
        <Link to={`/posts/${post.slug}`}>
          <button className="flex flex-row items-center bg-blue-900 text-white w-full justify-center drop-shadow-xl gap-2 hover:gap-5 duration-200 font-[500] p-2 rounded-es-lg rounded-ee-lg">
            Read <FaLongArrowAltRight />
          </button>
        </Link>
      </div>
    </div>
  );
}
