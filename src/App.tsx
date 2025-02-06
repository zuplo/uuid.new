import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useCallback, useState } from "react";

import "./App.css";

export default function UUIDGenerator() {
  const [uuid, setUuid] = useState(crypto.randomUUID());
  const [copied, setCopied] = useState(false);

  const generateNewUuid = useCallback(() => {
    setUuid(crypto.randomUUID());
    setCopied(false);
  }, []);

  const copyUuid = useCallback(() => {
    navigator.clipboard.writeText(uuid).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset "Copied!" status after 2 seconds
    });
  }, [uuid]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white px-14">
        <zuplo-banner mode="light"></zuplo-banner>
      </div>

      <div className="bg-white rounded-2xl shadow-lg w-fit">
        <div className="px-8 pt-8 pb-6">
          <h1 className="text-[2rem] font-bold text-center mb-6">uuid.new</h1>
          <div className="flex items-center bg-gray-100 rounded-lg mb-4">
            <code className="font-mono text-base px-3 py-2">{uuid}</code>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 mr-1"
              onClick={copyUuid}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="sr-only">Copy UUID</span>
            </Button>
          </div>
          <Button
            onClick={generateNewUuid}
            className="w-full bg-black text-white hover:bg-black/90"
            size="lg"
          >
            New
          </Button>
        </div>
      </div>
    </div>
  );
}
