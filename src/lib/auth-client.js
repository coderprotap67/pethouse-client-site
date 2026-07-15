import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://pet-server-site.vercel.app",
  fetchOptions: {
    credentials: "include" // এটি অত্যন্ত গুরুত্বপূর্ণ যাতে ব্রাউজার ক্রস-ডোমেইন কুকি এক্সেপ্ট করে
  }
});

export const {
  signIn,
  signOut,
  useSession,
} = authClient;