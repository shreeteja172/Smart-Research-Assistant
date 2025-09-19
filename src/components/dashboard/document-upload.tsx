"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "./dropzone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serializeFile } from "@/lib/serialize-files";

type SerializedFile = Awaited<ReturnType<typeof serializeFile>>;

export default function DocumentUpload() {
  const [files, setFiles] = useState<File[] | undefined>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (serializedFile: SerializedFile) => {
      const response = await fetch("/api/document", {
        method: "POST",
        body: JSON.stringify(serializedFile),
      });
      return response.json();
    },

    onSuccess: (data) => {
      toast.success(data.message || "Document uploaded successfully");
      queryClient.invalidateQueries({ queryKey: ["recent-documents"] });
      setFiles([]);
      setDialogOpen(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to upload document");
    },
  });

  const handleDrop = (files: File[]) => {
    setFiles(files);
  };

  const handleSubmit = async () => {
    if (!files?.length) {
      toast.warning("Please select a file");
      return;
    }

    const serializedFile = await serializeFile(files[0]);
    await mutateAsync(serializedFile);
  };

  return (
    <div className="text-center space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Upload Document
        </h3>
        <p className="text-sm text-muted-foreground">
          Support for PDF, DOC, and DOCX files up to 10MB
        </p>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="px-6 py-2">
            <Upload className="mr-2 h-4 w-4" />
            Choose File
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>
            Select a document to add to your knowledge base
          </DialogDescription>

          <Dropzone
            disabled={isPending}
            accept={{
              "application/pdf": [".pdf"],
              "application/msword": [".doc"],
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                [".docx"],
            }}
            maxFiles={1}
            maxSize={1024 * 1024 * 10}
            minSize={1024}
            onDrop={handleDrop}
            onError={(error) => toast.error(error.message)}
            src={files}
          >
            <DropzoneEmptyState />
            <DropzoneContent />
          </Dropzone>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isPending || !files?.length}
            >
              {isPending ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
