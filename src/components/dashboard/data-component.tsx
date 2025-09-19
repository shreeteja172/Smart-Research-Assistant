"use client";
import React, { useState } from "react";
import { FileIcon, Globe } from "lucide-react";
import DocumentUpload from "./document-upload";

const DataComponent = () => {
  const [activeTab, setActiveTab] = useState<"document" | "website">(
    "document"
  );

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        {/* Tab Headers */}
        <div className="flex bg-muted/30">
          <button
            onClick={() => setActiveTab("document")}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-all ${
              activeTab === "document"
                ? "bg-background text-foreground border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <FileIcon className="h-4 w-4" />
            Document
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === "document" && <DocumentUpload />}
        </div>
      </div>
    </div>
  );
};

export default DataComponent;
