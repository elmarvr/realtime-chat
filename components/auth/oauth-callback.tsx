"use client";

import { useClerk } from "@clerk/nextjs";
import { useEffect } from "react";
import { IconLoader } from "@tabler/icons-react";

export function OAuthCallback() {
  const { handleRedirectCallback } = useClerk();

  useEffect(() => {
    handleRedirectCallback({
      continueSignUpUrl: "/signup/continue",
    });
  }, [handleRedirectCallback]);

  return (
    <div
      role="status"
      aria-label="Loading"
      aria-describedby="loading-description"
      className="flex items-center justify-center"
    >
      <IconLoader className="w-12 h-12 animate-spin" aria-hidden="true" />
    </div>
  );
}
