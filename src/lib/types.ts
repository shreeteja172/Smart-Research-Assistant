import type { InferUITool, UIMessage } from "ai";
import { z } from "zod";

export type DataPart = { type: "append-message"; message: string };

export const messageMetadataSchema = z.object({
  createdAt: z.string(),
});

export type MessageMetadata = z.infer<typeof messageMetadataSchema>;

export type CustomUIDataTypes = {
  appendMessage: string;
  id: string;
  title: string;
  clear: null;
  finish: null;
};

export type ChatMessage = UIMessage<MessageMetadata, CustomUIDataTypes>;

export interface Attachment {
  name: string;
  url: string;
  contentType: string;
}

export type DBMessage = {
  id: string;
  createdAt: Date;
  chatId: string;
  role: string;
  parts: unknown;
  attachments: unknown;
};

export type ChatStatus = "submitted" | "streaming" | "ready" | "error";

export interface College {
  id: string;
  name: string;
  email: string;
}
