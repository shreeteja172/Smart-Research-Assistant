"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChatStatus, DBMessage } from "@/lib/types";
import { Landmark, RefreshCcw } from "lucide-react";
import { memo } from "react";
import { toast } from "sonner";

function ResetChatButton({ disabled, id }: { disabled: boolean; id: string }) {
  const handleClick = async () => {
    try {
      await fetch("/api/chat", {
        method: "DELETE",
        body: JSON.stringify({ chatId: id }),
      });
      window.location.reload();
    } catch (e) {
      console.log("[RESET_CHAT_ERROR]", e);
      toast.error("Something went wrong");
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            disabled={disabled}
            size="icon"
            onClick={handleClick}
          >
            <RefreshCcw />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Reset chat</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function PureChatHeader({
  messages,
  status,
  id,
}: {
  messages: DBMessage[];
  status: ChatStatus;
  id: string;
}) {
  return (
    <header className="shrink-0 flex justify-between items-center gap-2 border-b bg-white py-3 px-2.5">
      <div className="flex items-center gap-1">
        <Landmark />
        Genie
      </div>
      <ResetChatButton
        disabled={!messages.length || status === "submitted"}
        id={id}
      />
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return (
    prevProps.messages === nextProps.messages &&
    prevProps.status === nextProps.status &&
    prevProps.id === nextProps.id
  );
});
