import { ResetPasswordContinueForm } from "~/components/forms/reset-password-continue-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/components/ui/card";

export default function ResetPasswordContinuePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset password</CardTitle>
        <CardDescription>Enter your email and we will send you a verification code</CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPasswordContinueForm />
      </CardContent>
    </Card>
  );
}
