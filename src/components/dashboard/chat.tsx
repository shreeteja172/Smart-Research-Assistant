"use client";

import { useChat } from "@ai-sdk/react";
import {
  AIConversation,
  AIConversationContent,
  AIConversationScrollButton,
} from "@/components/ai/conversation";
import {
  AIInput,
  AIInputTextarea,
  AIInputToolbar,
  PreviewAttachment,
} from "@/components/ai/input";
import { AIMessage, AIMessageContent } from "@/components/ai/message";
import { ThinkingMessage } from "@/components/ai/thinking";
import { Button } from "@/components/ui/button";
import { DefaultChatTransport } from "ai";
import { ChatHeader } from "@/components/dashboard/chat-header";
import { EmptyScreen } from "@/components/dashboard/empty-screen";
import { Attachment, ChatMessage, College, DBMessage } from "@/lib/types";
import { generateUUID } from "@/lib/utils";
import { FormEventHandler, useState } from "react";
import { Streamdown } from "streamdown";
import { useQuery } from "@tanstack/react-query";

export default function Chat({
  id,
  initialMessages,
}: {
  id: string;
  initialMessages: ChatMessage[];
}) {
  const [text, setText] = useState<string>("");
  const [attachments, setAttachments] = useState<Array<Attachment>>([]);
  //   const { data: college } = useQuery({
  //     queryKey: ["college", collegeId],
  //     queryFn: async () => {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_APP_URL}/api/college/${collegeId}`,
  //         {
  //           method: "GET",
  //           credentials: "include",
  //           headers: {
  //             "Content-Type": "application/json",
  //             "Access-Control-Allow-Origin": "http://localhost:3000",
  //             "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  //             "Access-Control-Allow-Headers": "Content-Type, Authorization",
  //             "Access-Control-Allow-Credentials": "true",
  //           },
  //         }
  //       );
  //       const data = await response.json();

  //       return data;
  //     },
  //     staleTime: 1000 * 60 * 5 * 60,
  //   });

  const { messages, status, sendMessage, error, regenerate, setMessages } =
    useChat({
      id,
      generateId: generateUUID,
      experimental_throttle: 100,
      messages: initialMessages,
      transport: new DefaultChatTransport({
        api: "/api/chat",
        prepareSendMessagesRequest({ body, messages, id }) {
          return {
            body: {
              message: messages.at(-1),
              ...body,
            },
          };
        },
      }),
    });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!text) {
      return;
    }

    sendMessage({
      parts: [
        ...attachments.map((attachment) => ({
          type: "file" as const,
          url: attachment.url,
          name: attachment.name,
          mediaType: attachment.contentType,
        })),
        {
          type: "text",
          text: text,
        },
      ],
    });

    setText("");
    setAttachments([]);
  };

  return (
    <>
      <ChatHeader messages={messages as DBMessage[]} status={status} id={id} />

      <AIConversation>
        <AIConversationContent>
          {messages.length === 0 ? <EmptyScreen /> : null}

          {messages.map((message, index) => (
            <AIMessage
              from={message.role === "user" ? "user" : "assistant"}
              key={index}
            >
              <AIMessageContent>
                {message.parts.map((part, i) => {
                  switch (part.type) {
                    case "text":
                      return (
                        <div key={`${message.id}-${i}`}>
                          <Streamdown key={index}>{part.text}</Streamdown>
                        </div>
                      );
                    case "file":
                      return (
                        <div
                          key={`image-${message.id}-${i}`}
                          data-testid={`message-attachments`}
                          className="flex flex-row justify-start gap-2"
                        >
                          <PreviewAttachment
                            key={index}
                            attachment={{
                              name: part.filename ?? "file",
                              contentType: part.mediaType,
                              url: part.url,
                            }}
                            showTitle={false}
                          />
                        </div>
                      );
                  }
                })}
              </AIMessageContent>

              {/* error UI moved to global banner below conversation */}
            </AIMessage>
          ))}
          {status === "submitted" &&
            messages.length > 0 &&
            messages[messages.length - 1].role === "user" && (
              <AIMessage from="assistant">
                <AIMessageContent>
                  <ThinkingMessage />
                </AIMessageContent>
              </AIMessage>
            )}
        </AIConversationContent>
        <AIConversationScrollButton />
      </AIConversation>

      <div className="p-1">
        {error && (
          <div
            className="mb-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800/40 dark:bg-red-950/40 dark:text-red-300"
            role="alert"
            aria-live="assertive"
          >
            <div className="flex items-center justify-between gap-2">
              <span>{error.message ?? "An error occurred."}</span>
              <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={() => regenerate()}
              >
                Retry
              </Button>
            </div>
          </div>
        )}
        <AIInput onSubmit={handleSubmit} className="flex items-center">
          <AIInputTextarea
            onChange={(e) => setText(e.target.value)}
            value={text}
            disabled={error != null}
            status={status}
            text={text}
            error={error}
            attachments={attachments}
            setAttachments={setAttachments}
            setText={setText}
          />
          <AIInputToolbar>
            {/* <AIInputSubmit
              disabled={!text || error != null}
              status={status}
              variant={"ghost"}
            /> */}
          </AIInputToolbar>
        </AIInput>
      </div>
    </>
  );
}
