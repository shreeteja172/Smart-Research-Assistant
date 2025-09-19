import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { User, WelcomeCard } from "@/components/dashboard/welcome-card";

export default async function Dashboard() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session?.data?.user) {
    redirect("/sign-in");
  }

  console.log(session.data.user);

  return <WelcomeCard user={session.data.user as User} />;
}
