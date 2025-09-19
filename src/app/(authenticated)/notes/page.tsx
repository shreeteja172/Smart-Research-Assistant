import React, { Suspense } from "react";
import DataComponent from "@/components/dashboard/data-component";
import RecentDocuments from "@/components/dashboard/recent-documents";
// import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/providers/prisma";
import { authClient } from "@/lib/auth-client";

const SuspenseComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

const page = async () => {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });
  return (
    <SuspenseComponent>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Knowledge Base
          </h1>
          <p className="text-muted-foreground">
            Upload documents or add websites to build your knowledge base
          </p>
        </div>
        <DataComponent />

        {session && <RecentDocumentsComponent session={session} />}
      </div>
    </SuspenseComponent>
  );
};

const RecentDocumentsComponent = async ({ session }: { session: any }) => {
  try {
    console.log(session, "session sjf");
    const userId = session.data.user.id;
    console.log(userId, "userId");

    const documents = await prisma.document.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10, // Limit to recent 10 documents
    });

    return <RecentDocuments documents={documents} />;
  } catch (error) {
    console.error("Error fetching documents:", error);
    return (
      <div className="mt-8 p-4 border border-destructive/20 rounded-lg bg-destructive/5">
        <p className="text-destructive">
          Error loading documents. Please try again.
        </p>
      </div>
    );
  }
};

export default page;
