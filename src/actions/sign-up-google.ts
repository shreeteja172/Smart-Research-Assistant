import { authClient } from "@/lib/auth-client";

export const signInWithGoogle = async () => {
  console.log("🚀 Starting Google OAuth flow...");
  try {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
    return data;
  } catch (error) {
    console.error(" Google OAuth error:", error);
  }
};
