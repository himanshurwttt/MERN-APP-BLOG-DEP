import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      required: true,
      type: String,
      unique: true,
    },
    username: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    profilePicture: {
      type: String,
      default:
        "https://imgs.search.brave.com/bIkpHw6cWZRHzdOnYK7TnI67_uqVzpREf0V0pQWu_pw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2RkL2Yw/LzExL2RkZjAxMTBh/YTE5ZjQ0NTY4N2I3/Mzc2NzllZWM5Y2Iy/LmpwZw",
    },
    bio: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);
export default User;
