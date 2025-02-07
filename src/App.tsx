import { Button } from "@/components/ui/button";
import { Braces, Check, Copy } from "lucide-react";
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900/50 backdrop-blur-sm">
        <zuplo-banner mode="dark"></zuplo-banner>
      </div>

      <div className="w-full max-w-md px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">uuid.new</h1>
          <Braces className="h-6 w-6 text-pink-500" />
        </div>
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <code className="font-mono text-sm text-gray-300">{uuid}</code>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-pink-500"
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
        </div>
        <Button
          onClick={generateNewUuid}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
          size="lg"
        >
          Generate New UUID
        </Button>
      </div>
    </div>
  );
}
