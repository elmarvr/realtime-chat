import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="container grid min-h-screen place-items-center">
      <section className="w-full max-w-md">{children}</section>
    </main>
  );
}
