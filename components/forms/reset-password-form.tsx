"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { checkEmailSchema } from "~/lib/validations/auth";
import { useValidatedForm } from "~/hooks/use-validated-form";
import { IconLoader } from "@tabler/icons-react";

export function ResetPasswordForm() {
  const router = useRouter();
  const { isLoaded, signIn } = useSignIn();
  const [isPending, startTransition] = React.useTransition();

  // react-hook-form
  const form = useValidatedForm(checkEmailSchema, {
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    if (!isLoaded) return;

    startTransition(async () => {
      try {
        const firstFactor = await signIn.create({
          strategy: "reset_password_email_code",
          identifier: data.email,
        });

        if (firstFactor.status === "needs_first_factor") {
          router.push("/signin/reset-password/continue");
          // toast.message("Check your email", {
          //   description: "We sent you a 6-digit verification code.",
          // });
        }
      } catch (err) {
        // catchClerkError(err);
      }
    });
  });

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending}>
          {isPending && <IconLoader className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />}
          Continue
        </Button>
      </form>
    </Form>
  );
}
