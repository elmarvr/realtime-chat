import { OAuthButtons } from "~/components/auth/oauth-buttons";
import { SignInForm } from "~/components/forms/signin-form";
import { VerifyEmailForm } from "~/components/forms/verify-email-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/components/ui/card";

export default function VerifyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify email</CardTitle>
        <CardDescription>Verify your email address to complete your account creation</CardDescription>
      </CardHeader>

      <CardContent>
        <VerifyEmailForm />
      </CardContent>
    </Card>
  );
}
