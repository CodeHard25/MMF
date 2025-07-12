import React from "react";
import { AuthProvider } from "../contexts/AuthContext.tsx";
import AuthGuard from "../components/AuthGuard.tsx";
import FashionChatbot from "../components/FashionChatbot.tsx";

const FashionChatPage: React.FC = () => {
  return (
    <AuthProvider>
      <AuthGuard>
        <FashionChatbot />
      </AuthGuard>
    </AuthProvider>
  );
};

export default FashionChatPage;
