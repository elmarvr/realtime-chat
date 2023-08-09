"use client";

import { useSignIn } from "@clerk/nextjs";
import { type OAuthStrategy } from "@clerk/nextjs/server";
import { Icon, IconBrandGithub, IconBrandGoogle, IconLoader } from "@tabler/icons-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";

const providers = [
  {
    name: "Google",
    strategy: "oauth_google",
    icon: IconBrandGoogle,
  },
  {
    name: "Github",
    strategy: "oauth_github",
    icon: IconBrandGithub,
  },
] satisfies {
  name: string;
  strategy: OAuthStrategy;
  icon: Icon;
}[];

export function OAuthButtons() {
  const [isLoading, setIsLoading] = useState<OAuthStrategy | null>(null);
  const { isLoaded: signInIsLoaded, signIn } = useSignIn();

  async function oauthSignIn(provider: OAuthStrategy) {
    if (!signInIsLoaded) return;

    try {
      setIsLoading(provider);
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/callback",
        redirectUrlComplete: "/",
      });
    } catch (error) {
      setIsLoading(null);

      //Handle toast

      // const unknownError = "Something went wrong, please try again.";

      // isClerkAPIResponseError(error)
      //   ? toast.error(error.errors[0]?.longMessage ?? unknownError)
      //   : toast.error(unknownError);
    }
  }

  return (
    <ul className="grid gap-4">
      {providers.map((provider) => (
        <li key={provider.strategy}>
          <Button
            variant="outline"
            disabled={isLoading === provider.strategy}
            className="w-full"
            onClick={() => oauthSignIn(provider.strategy)}
          >
            {isLoading === provider.strategy ? (
              <IconLoader className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
            ) : (
              <provider.icon className="w-5 h-5 mr-2" aria-hidden="true" />
            )}
            {provider.name}
          </Button>
        </li>
      ))}
    </ul>
  );
}
