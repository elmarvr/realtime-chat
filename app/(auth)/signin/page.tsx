import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { OAuthButtons } from "~/components/auth/oauth-buttons";
import { SignInForm } from "~/components/forms/signin-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

export default async function SignInPage() {
  const user = await currentUser();

  if (user) redirect("/");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in to your account to continue.</CardDescription>
      </CardHeader>

      <CardContent>
        <OAuthButtons />

        <div className="relative flex items-center my-6">
          <Separator />
          <span className="absolute px-2 text-xs uppercase -translate-x-1/2 bg-background left-1/2 text-muted-foreground">
            Or
          </span>
        </div>

        <SignInForm />
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm text-muted-foreground">
          <span className="hidden mr-1 sm:inline-block">Don&apos;t have an account?</span>
          <Link
            aria-label="Sign up"
            href="/signup"
            className="transition-colors text-primary underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </div>
        <Link
          aria-label="Reset password"
          href="/signin/reset-password"
          className="text-sm transition-colors text-primary underline-offset-4 hover:underline"
        >
          Reset password
        </Link>
      </CardFooter>
    </Card>
  );
}
