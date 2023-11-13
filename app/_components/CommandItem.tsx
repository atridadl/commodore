"use client";
import { useState } from "react";

type CommandItemProps = {
  title: string;
  command: string;
};

const CommandItem = ({ title, command }: CommandItemProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-row flex-wrap gap-2 items-center justify-center">
      <p> {title}: </p>
      <input
        type="text"
        value={command}
        className="input input-bordered w-full min-w-full"
        disabled
      />
      <button className="btn btn-secondary" onClick={handleCopyClick}>
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export default CommandItem;
