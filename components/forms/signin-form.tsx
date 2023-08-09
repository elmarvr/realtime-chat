"use client";

import { useValidatedForm } from "~/hooks/use-validated-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { signinSchema } from "~/lib/validations/auth";
import { Input } from "~/components/ui/input";
import { PasswordInput } from "~/components/password-input";
import { Button } from "~/components/ui/button";
import { IconLoader } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import React from "react";

export function SignInForm() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isPending, startTransition] = React.useTransition();

  const form = useValidatedForm(signinSchema, {
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    if (!isLoaded) return;

    startTransition(async () => {
      try {
        const result = await signIn.create({
          identifier: data.emailOrUsername,
          password: data.password,
        });

        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId });

          router.push("/");
        } else {
          //Investigate why the login hasn't completed
          console.log(result);
        }
      } catch (err) {
        //Implement toast
      }
    });
  });

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={onSubmit}>
        <FormField
          name="emailOrUsername"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email or Username</FormLabel>
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
          Sign in
        </Button>
      </form>
    </Form>
  );
}
