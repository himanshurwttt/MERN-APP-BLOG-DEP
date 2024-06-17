import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://imgs.search.brave.com/RrJJXJk3BSM9fMxCJBMY4hviS0Am9We59TFna3Kc0tQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zb2xp/bG9xdXl3cC5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMTYv/MDgvSG93LXRvLVNl/dC1hLURlZmF1bHQt/RmVhdHVyZWQtSW1h/Z2UtaW4tV29yZFBy/ZXNzLnBuZw",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
