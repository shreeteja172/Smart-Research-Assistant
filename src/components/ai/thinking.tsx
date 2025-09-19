import { cn } from "@/lib/utils";
import { SparklesIcon } from "lucide-react";

export const ThinkingMessage = () => {
  const role = "assistant";

  return (
    <div
      data-testid="message-assistant-loading"
      className="w-full group/message"
      data-role={role}
    >
      <div
        className={cn(
          "flex gap-2 group-data-[role=user]/message:px-3 w-full group-data-[role=user]/message:w-fit group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:py-2 rounded-xl",
          {
            "group-data-[role=user]/message:bg-muted": true,
          }
        )}
      >
        <div className="size-8 flex items-center rounded-full justify-center shrink-0">
          <SparklesIcon size={14} className="text-primary" />
        </div>

        <div className="flex flex-col gap-2 w-full justify-center">
          <div className="flex flex-col gap-4">Thinking...</div>
        </div>
      </div>
    </div>
  );
};
