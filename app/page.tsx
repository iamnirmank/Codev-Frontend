"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/ui/header/header";
import ChatSection from "./components/ui/chat/chat-section";
import FeedbackForm from "./components/ui/feedback/user-feedback";
import "./page.css";

// Common Section Wrapper Component
const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-8xl p-8 bg-foreground shadow-lg rounded-lg">
    {children}
  </div>
);

// Conditional content rendering
const Content = () => {
    return (
      <>
        <SectionWrapper>
          <FeedbackForm />
        </SectionWrapper>
        <SectionWrapper>
          <ChatSection />
        </SectionWrapper>
      </>
    );
};

export default function Home() {
  const [tokens, setTokens] = useState<{ accessToken: string | null, resetToken: string | null }>({
    accessToken: null,
    resetToken: null,
  });

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-6 bg-primary">
      <SectionWrapper>
        <Header />
      </SectionWrapper>
      <Content />
    </main>
  );
}
