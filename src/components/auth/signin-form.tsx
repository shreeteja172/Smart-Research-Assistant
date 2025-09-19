"use client";

import { signInWithGoogle } from "@/actions/sign-up-google";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function SignInForm() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">
          Welcome
          <span className="text-green-500"> Back</span>
        </CardTitle>
        <CardDescription>
          Enter your credentials to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button
          variant="outline"
          className="w-full"
          onClick={async () => {
            try {
              setIsGoogleLoading(true);
              await signInWithGoogle();
            } finally {
              // keep loading until navigation happens; safety timeout in case of error
              setTimeout(() => setIsGoogleLoading(false), 4000);
            }
          }}
          disabled={isGoogleLoading}
        >
          {isGoogleLoading ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Redirecting to Google...
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Login with Google
            </span>
          )}
        </Button>
        
      </CardContent>
      <CardFooter className="mx-auto">
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="sign-up" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
