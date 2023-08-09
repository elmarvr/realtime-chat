"use client";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "~/components/ui/input";
import { useValidatedForm } from "~/hooks/use-validated-form";

import { useClerk, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { signupContinueSchema } from "~/lib/validations/auth";
import { Button } from "../ui/button";
import * as React from "react";
import { IconLoader } from "@tabler/icons-react";

export function SignupContinueForm() {
  const router = useRouter();
  const { setActive } = useClerk();
  const [isPending, startTransition] = React.useTransition();

  const form = useValidatedForm(signupContinueSchema, {
    defaultValues: {
      username: "",
    },
  });

  const { signUp, isLoaded } = useSignUp();

  const onSubmit = form.handleSubmit(async (data) => {
    if (!isLoaded) return;

    startTransition(async () => {
      const { createdSessionId } = await signUp.update(data);

      if (signUp.status === "complete") {
        await setActive({ session: createdSessionId });

        router.push("/");
      }
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="grid gap-4">
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending}>
          {isPending && <IconLoader className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />}
          Sign up
        </Button>
      </form>
    </Form>
  );
}
