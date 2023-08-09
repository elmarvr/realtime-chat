import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { SignOutButton } from "~/components/auth/signout-button";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen">
      <div className="p-4">
        <SignOutButton />
      </div>
      {children}
    </div>
  );
}
