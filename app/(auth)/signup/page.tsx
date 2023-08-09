import { Separator } from "~/components/ui/separator";
import { OAuthButtons } from "~/components/auth/oauth-buttons";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { SignUpForm } from "~/components/forms/signup-form";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Choose your preferred sign up method</CardDescription>
      </CardHeader>

      <CardContent>
        <OAuthButtons />

        <div className="relative flex items-center my-6">
          <Separator />
          <span className="absolute px-2 text-xs uppercase -translate-x-1/2 bg-background left-1/2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <SignUpForm />
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            aria-label="Sign in"
            href="/signin"
            className="transition-colors text-primary underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
