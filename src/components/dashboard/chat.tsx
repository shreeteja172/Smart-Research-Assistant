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
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="mx-auto w-full max-w-5xl px-3 sm:px-4">
      {/* <div className="sticky top-0 z-10 -mx-3 sm:-mx-4 px-3 sm:px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <ChatHeader messages={messages as DBMessage[]} status={status} id={id} />
      </div> */}

      <Card className="border shadow-sm rounded-2xl overflow-hidden">
        <CardContent className="p-0">
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
                            <div key={`${message.id}-${i}`} className="prose dark:prose-invert max-w-none">
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
        </CardContent>
      </Card>

      <div className="sticky bottom-2 z-10 mt-2 rounded-2xl border bg-card/70 backdrop-blur px-2 py-1 shadow-sm">
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
    </div>
  );
}
