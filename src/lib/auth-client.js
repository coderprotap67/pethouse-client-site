import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://pet-server-site.vercel.app"
});

export const {
  signIn,
  signOut,
  useSession,
} = authClient;