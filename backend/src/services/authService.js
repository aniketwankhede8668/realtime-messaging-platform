import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser = async (username, password) => {

  if (
    !username ||
    !password
  ) {
    throw new Error(
      "Please fill username and password"
    );
  }

  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();

  if (
    !trimmedUsername ||
    !trimmedPassword
  ) {

    throw new Error(
      "Please fill username and password"
    );
  }

  const existingUser = await User.findOne({
      username: trimmedUsername
    });

  if (existingUser) {
    throw new Error(
      "User already exists"
    );
  }

  const hashedPassword = await bcrypt.hash(
      trimmedPassword,
      10
    );

  const user = await User.create({
    username: trimmedUsername,
    password: hashedPassword
  });

  return {
    message:
      "Registration successful"
  };
};

export const loginUser = async (username, password) => {

  if (
    !username ||
    !password
  ) {

    throw new Error(
      "Please enter username and password"
    );
  }

  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();

  if (
    !trimmedUsername ||
    !trimmedPassword
  ) {
    throw new Error(
      "Please enter username and password"
    );
  }

  const user = await User.findOne({
    username: trimmedUsername
  });

  if (!user) {
    throw new Error(
      "Username and password mismatch"
    );
  }

  const isMatch = await bcrypt.compare(
      trimmedPassword,
      user.password
    );

  if (!isMatch) {
    throw new Error(
      "Username and password mismatch"
    );
  }

  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "7d"
    }
  );

  return {
    token,
    user: {
      id: user._id,
      username: user.username
    }
  };
};