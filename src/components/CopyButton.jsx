import React, { useState } from "react";
import { FiCopy } from "react-icons/fi";

const CopyButton = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="relative">
      <button
  className="text-indigo-600 hover:text-indigo-800 text-xs flex items-center gap-1 cursor-pointer"
  onClick={handleCopy}
  disabled={!textToCopy}
>
  <FiCopy className="inline-block" />
  {copied ? "Copied!" : "Copy"}
</button>

    </div>
  );
};

export default CopyButton;
