// import { getCollegeById } from "@/lib/queries";

import Chat from "@/components/dashboard/chat";
import { ChatMessage, College } from "@/lib/types";
import { generateUUID } from "@/lib/utils";
import { redirect } from "next/navigation";
import React from "react";

export default async function ChatPage({}) {
  const id = generateUUID();

  const initialMessages: ChatMessage[] = [];

  return <Chat id={id} initialMessages={initialMessages} />;
}
