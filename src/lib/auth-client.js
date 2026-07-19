import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://pethouse-server-site.vercel.app",
  fetchOptions: {
    credentials: "include" 
  }
});

export const {
  signIn,
  signOut,
  useSession,
} = authClient;