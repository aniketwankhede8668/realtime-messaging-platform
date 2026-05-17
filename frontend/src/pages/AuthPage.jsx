import React from "react";

import AuthForm from "../components/AuthForm";

export default function AuthPage({
  onAuthSuccess
}) {

  return (
    <AuthForm
      onAuthSuccess={
        onAuthSuccess
      }
    />
  );
}