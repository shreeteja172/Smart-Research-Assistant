"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Trash2, Eye, Download } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useDocuments } from "@/hooks/use-documents";
import { Skeleton } from "@/components/ui/skeleton";

interface Document {
  id: string;
  name: string;
  type: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const getFileIcon = (type: string) => {
  switch (type) {
    case "document":
      return <FileText className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "success":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "processing":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "failed":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

const DocumentCard = ({ document }: { document: Document }) => {
  const handleView = (id: string) => {
    console.log("View document:", id);
  };

  const handleDownload = (id: string) => {
    console.log("Download document:", id);
  };

  return (
    <Card className="group hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {getFileIcon(document.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className="font-medium text-foreground truncate"
                title={document.name}
              >
                {document.name}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge
                  variant="secondary"
                  className={getStatusColor(document.status)}
                >
                  {document.status}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDistanceToNow(new Date(document.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={() => handleView(document.id)}
              className="h-8 w-8 p-0"
              title="View document"
            >
              <Eye className="h-4 w-4" />
            </Button> */}
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDownload(document.id)}
              className="h-8 w-8 p-0"
              title="Download document"
            >
              <Download className="h-4 w-4" />
            </Button> */}
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(document.id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              title="Delete document"
            >
              <Trash2 className="h-4 w-4" />
            </Button> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const RecentDocuments: React.FC = () => {
  const { data: documents, isLoading, error } = useDocuments();

  if (isLoading) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Recent Documents</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-start space-x-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Recent Documents</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-destructive">
              Error loading documents. Please try again.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!documents || documents.length === 0) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Recent Documents</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No documents yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Upload your first document to get started with your knowledge
              base.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>Recent Documents</span>
          <Badge variant="secondary" className="ml-2">
            {documents.length}
          </Badge>
        </h2>
      </div>

      <div className="grid gap-3">
        {documents.map((document) => (
          <DocumentCard key={document.id} document={document} />
        ))}
      </div>
    </div>
  );
};

export default RecentDocuments;
