import { clerkMiddleware } from "@clerk/nextjs/server"

const protectedPaths = [
  "/",
  "/upcoming",
  "/previous",
  "/recordings",
  "/personal-room",
]

export default clerkMiddleware(async (auth, req) => {
  const { pathname: pathName } = req.nextUrl;

  const isProtected = protectedPaths.includes(pathName) || pathName.startsWith("/meeting");

  if (isProtected) {
    await auth.protect();
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Always run for Clerk-specific frontend API routes
    "/__clerk/(.*)",
  ],
}
