import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { User, WelcomeCard } from "@/components/dashboard/welcome-card";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Dashboard() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session?.data?.user) {
    redirect("/sign-in");
  }

  const user = session.data.user as User;

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      <WelcomeCard user={user} />

      <Card className="rounded-3xl shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-900 border border-gray-200 dark:border-gray-800">
        <CardContent className="p-8 space-y-8">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="w-8 h-8 text-green-500 shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                All systems connected 🎉 & Perfectly Working (Try it Out)
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                The backend is ready to use. You can{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  upload your PDFs in the Notes section
                </span>{" "}
                and then{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  chat about them in the Chat section
                </span>
                . Upload first, then ask your questions — responses come in seconds 🚀
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <Link href="/notes">
              <Button className="px-7 py-3 rounded-xl text-base">
                Go to Notes
              </Button>
            </Link>
            <Link href="/chat">
              <Button
                variant="outline"
                className="px-7 py-3 rounded-xl text-base border-gray-300 dark:border-gray-600 dark:text-white"
              >
                Go to Chat
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
