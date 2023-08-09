"use client";

import { useValidatedForm } from "~/hooks/use-validated-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { signupSchema } from "~/lib/validations/auth";
import { Input } from "~/components/ui/input";
import { PasswordInput } from "~/components/password-input";
import { Button } from "~/components/ui/button";
import { IconLoader } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import React from "react";

export function SignUpForm() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isPending, startTransition] = React.useTransition();

  const form = useValidatedForm(signupSchema, {
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    if (!isLoaded) return;

    startTransition(async () => {
      try {
        await signUp.create({
          username: data.username,
          emailAddress: data.email,
          password: data.password,
        });

        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        router.push("/signup/verify");
      } catch (err) {
        console.log(err);
      }
    });
  });

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={onSubmit}>
        <FormField
          name="email"
          control={form.control}
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

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
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
