import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/signin(.*)", "/signup(.*)", "/callback(.*)"],

  async afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      //  For public routes, we don't need to do anything
      return NextResponse.next();
    }

    const url = new URL(req.nextUrl.origin);

    if (!auth.userId) {
      //  If user tries to access a private route without being authenticated,
      //  redirect them to the sign in page
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api)(.*)"],
};

// // Set the user's role to user if it doesn't exist
// const user = await clerkClient.users.getUser(auth.userId)

// if (!user) {
//   throw new Error("User not found.")
// }

// // If the user doesn't have a role, set it to user
// if (!user.privateMetadata.role) {
//   await clerkClient.users.updateUserMetadata(auth.userId, {
//     privateMetadata: {
//       role: "user" satisfies UserRole,
//     },
//   })
// }
