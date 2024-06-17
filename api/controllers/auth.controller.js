import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import logger from "../logger.js"; // Import logger

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(409, "User already exists, please login"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_TOKEN_KEY, {
      expiresIn: "5d",
    });

    logger.info(`User signed up: ${email}`);

    res
      .status(201)
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      })
      .json({ user: newUser });
  } catch (error) {
    logger.error("Signup error:", error);
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !bcryptjs.compareSync(password, user.password)) {
      return next(errorHandler(401, "Invalid email or password"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_KEY, {
      expiresIn: "5d",
    });

    const { password: pass, ...rest } = user._doc;

    logger.info(`User signed in: ${email}`);

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      })
      .json(rest);
  } catch (error) {
    logger.error("Signin error:", error);
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const { email } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      const username = generateRandomUsername(email);
      const password = generateRandomPassword();
      const hashedPassword = await bcryptjs.hash(password, 10);

      user = new User({
        email,
        username,
        password: hashedPassword,
        profilePicture: "default_profile_picture_url",
        isAdmin: false,
      });

      await user.save();
      logger.info(`New user created through Google: ${email}`);
    } else {
      logger.info(`Existing user signed in through Google: ${email}`);
    }

    const token = jwt.sign({ email }, process.env.JWT_TOKEN_KEY, {
      expiresIn: "2d",
    });

    const { password, ...rest } = user._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      })
      .json(rest);
  } catch (error) {
    logger.error("Google auth error:", error);
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token", {
        sameSite: "strict",
        httpOnly: true,
        path: "/",
      })
      .status(200)
      .json({ message: "Signout successfully" });

    logger.info("User signed out");
  } catch (error) {
    logger.error("Signout error:", error);
    next(error);
  }
};

// Helper functions for generating random username and password (assuming these are defined somewhere)
function generateRandomUsername(email) {
  const prefix = email.split("@")[0];
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${randomSuffix}`;
}

function generateRandomPassword() {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+[]{}|;:,.<>?";
  let password = "";
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
}
