import React, { Suspense } from "react";
import DataComponent from "@/components/dashboard/data-component";

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
      </div>
    </SuspenseComponent>
  );
};

export default page;
