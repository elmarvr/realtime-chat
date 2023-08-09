"use client";

import { useClerk } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { IconLogout } from "@tabler/icons-react";

export function SignOutButton() {
  const { signOut } = useClerk();

  return (
    <Button variant="ghost" onClick={() => signOut()}>
      <IconLogout />
    </Button>
  );
}
