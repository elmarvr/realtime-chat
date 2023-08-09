import { ResetPasswordForm } from "~/components/forms/reset-password-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/components/ui/card";

export default function ResetPasswordPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset password</CardTitle>
        <CardDescription>Enter your email and we will send you a verification code</CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPasswordForm />
      </CardContent>
    </Card>
  );
}
