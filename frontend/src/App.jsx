import React, { useEffect, useState } from "react";
import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";

export default function App() {

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {

      setUser(
        JSON.parse(storedUser)
      );
    }

  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #667eea, #764ba2)"
      }}
    >
      {
        user
          ? <ChatPage />
          : (
            <AuthPage
              onAuthSuccess={setUser}
            />
          )
      }
    </div>
  );
}