import { Landmark } from "lucide-react";
import { memo } from "react";
import { College } from "@/lib/types";

function PureEmptyScreen({}: {}) {
  return (
    <div className="flex flex-col gap-2 pt-20">
      <div className="flex flex-col items-center">
        <Landmark className="size-6 text-primary" />
        <h1 className="text-xl">Genie</h1>
      </div>
      <p className="text-muted-foreground text-center text-base">
        Welcome to Research Agent. My name is Genie and I&apos;m here to guide
        you. What&apos;s your name?
      </p>
    </div>
  );
}

export const EmptyScreen = memo(PureEmptyScreen);
