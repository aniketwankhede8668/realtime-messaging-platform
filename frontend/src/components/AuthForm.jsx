import React, { useState } from "react";
import { loginUser, registerUser } from "../services/authService";

export default function AuthForm({onAuthSuccess}) {

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] =useState("");

  const handleSubmit = async () => {

    try {
  
      const payload = {
        username,
        password
      };
  
      if (isLogin) {
  
        const response =
          await loginUser(payload);
  
        localStorage.setItem(
          "token",
          response.token
        );
  
        localStorage.setItem(
          "user",
          JSON.stringify(response.user)
        );
  
        onAuthSuccess(response.user);
  
      } else {
  
        await registerUser(payload);
  
        alert(
          "Registration successful. Please login."
        );
  
        setIsLogin(true);
  
        setPassword("");
      }
  
    } catch (error) {
  
      alert(
        error.response?.data?.message
        || error.message
      );
    }
  };
  
  return (
    <div className="authContainer">
  
      <div className="authCard">
  
        <h1 className="authTitle">
          {isLogin ? "Login" : "Register"}
        </h1>
  
        <div className="authInputWrapper">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="authInput"
          />
        </div>
  
        <div className="authInputWrapper">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="authInput"
          />
        </div>
  
        <button
          onClick={handleSubmit}
          className="loginButton"
        >
          {isLogin ? "Login" : "Register"}
        </button>
  
        <div className="divider">
          <span>OR</span>
        </div>
  
        <button
          onClick={() =>
            setIsLogin(!isLogin)
          }
          className="secondaryButton"
        >
          {
            isLogin
              ? "Create Account"
              : "Already have an account?"
          }
        </button>
  
      </div>
  
    </div>
  );
}