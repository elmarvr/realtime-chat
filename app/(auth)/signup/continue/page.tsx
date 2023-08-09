import { SignupContinueForm } from "~/components/forms/signup-continue-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export default function ContinuePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fill in missing information</CardTitle>
        <CardDescription>We need some more information to complete your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <SignupContinueForm />
      </CardContent>
    </Card>
  );
}
