"use client";

import { useValidatedForm } from "~/hooks/use-validated-form";
import { verifyEmailSchema } from "~/lib/validations/auth";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import * as React from "react";
import { IconLoader } from "@tabler/icons-react";

export function VerifyEmailForm() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isPending, startTransition] = React.useTransition();

  const form = useValidatedForm(verifyEmailSchema, {
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    if (!isLoaded) return;

    startTransition(async () => {
      try {
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: data.code,
        });
        if (completeSignUp.status !== "complete") {
          /*  investigate the response, to see if there was an error
             or if the user needs to complete more steps.*/
          console.log(JSON.stringify(completeSignUp, null, 2));
        }
        if (completeSignUp.status === "complete") {
          await setActive({ session: completeSignUp.createdSessionId });

          router.push("/");
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
          name="code"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending}>
          {isPending && <IconLoader className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />}
          Create account
        </Button>
      </form>
    </Form>
  );
}
