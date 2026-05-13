import { Button } from "@/components/ui/button";
import { Check, Copy, BracketsCurly, Code, ArrowsClockwise } from "@phosphor-icons/react";
import { useCallback, useMemo, useState } from "react";
import {
  CustomSelect,
  CustomSelectContent,
  CustomSelectItem,
  CustomSelectTrigger,
  CustomSelectValue,
} from "@/components/ui/custom-select";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import "./App.css";

export default function UUIDGenerator() {
  const [uuid, setUuid] = useState(crypto.randomUUID());
  const [copied, setCopied] = useState(false);
  const [snippetCopied, setSnippetCopied] = useState(false);
  const [selectedLanguage, setSelectedLanguage] =
    useState<keyof typeof prismLanguageMap>("curl");

  const codeSnippets = useMemo(
    () => ({
      curl: `curl https://uuid.new`,
      javascript: `const response = await fetch('https://uuid.new', {
  headers: {
    'Content-Type': 'application/json'
  }
});
const result = await response.json();
console.log(result.uuid);`,
      python: `import requests

response = requests.get('https://uuid.new', headers={'Content-Type': 'application/json'})
uuid = response.json()['uuid']
print(uuid)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://uuid.new');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
$response = curl_exec($ch);
curl_close($ch);
$data = json_decode($response, true);
echo $data['uuid'];
?>`,
      java: `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import org.json.JSONObject; // Requires org.json library

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("https://uuid.new"))
        .header("Content-Type", "application/json")
        .GET()
        .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
JSONObject json = new JSONObject(response.body());
String uuid = json.getString("uuid");
System.out.println(uuid);`,
      http: `GET https://uuid.new
Content-Type: application/json`,
    }),
    []
  );

  const languageLabels: Record<keyof typeof codeSnippets, string> = {
    curl: "cURL",
    javascript: "JavaScript",
    python: "Python",
    php: "PHP",
    java: "Java",
    http: "HTTP",
  };

  const prismLanguageMap = {
    curl: "bash",
    javascript: "javascript",
    python: "python",
    php: "php",
    java: "java",
    http: "http",
  };

  const generateNewUuid = useCallback(() => {
    setUuid(crypto.randomUUID());
    setCopied(false);
  }, []);

  const copyUuid = useCallback(() => {
    navigator.clipboard.writeText(uuid).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [uuid]);

  const copySnippet = useCallback(() => {
    navigator.clipboard.writeText(codeSnippets[selectedLanguage]).then(() => {
      setSnippetCopied(true);
      setTimeout(() => setSnippetCopied(false), 2000);
    });
  }, [selectedLanguage, codeSnippets]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9fafb] text-[#111827] px-4 py-16">
      <div className="fixed top-0 left-0 right-0 z-50">
        <zuplo-banner mode="light"></zuplo-banner>
      </div>

      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-[28px] font-semibold tracking-[-0.3px] leading-[1.2]">
            uuid.new
          </h1>
          <BracketsCurly size={24} weight="regular" className="text-[#FF00BD]" />
        </div>

        <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 mb-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#9ca3af] mb-2">
            Your UUID
          </div>
          <div className="flex items-center justify-between gap-3">
            <code className="font-mono text-[14px] text-[#111827] break-all">
              {uuid}
            </code>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 h-9 w-9"
              onClick={copyUuid}
              aria-label="Copy UUID"
            >
              {copied ? (
                <Check size={16} weight="regular" className="text-[#10b981]" />
              ) : (
                <Copy size={16} weight="regular" />
              )}
            </Button>
          </div>
        </div>

        <Button
          onClick={generateNewUuid}
          className="w-full mb-8"
          size="lg"
        >
          <ArrowsClockwise size={16} weight="regular" />
          Generate new UUID
        </Button>

        <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Code size={16} weight="regular" className="text-[#6b7280]" />
              <h2 className="text-[15px] font-semibold text-[#111827]">
                API examples
              </h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={copySnippet}
              aria-label="Copy code snippet"
            >
              {snippetCopied ? (
                <Check size={16} weight="regular" className="text-[#10b981]" />
              ) : (
                <Copy size={16} weight="regular" />
              )}
            </Button>
          </div>

          <div className="mb-3">
            <CustomSelect
              value={selectedLanguage}
              onValueChange={(value) =>
                setSelectedLanguage(value as keyof typeof prismLanguageMap)
              }
            >
              <CustomSelectTrigger className="w-full">
                <CustomSelectValue placeholder="Select language" />
              </CustomSelectTrigger>
              <CustomSelectContent>
                {Object.entries(languageLabels).map(([value, label]) => (
                  <CustomSelectItem key={value} value={value}>
                    {label}
                  </CustomSelectItem>
                ))}
              </CustomSelectContent>
            </CustomSelect>
          </div>

          <div className="rounded-lg overflow-hidden border border-[#1e1e2e]">
            <SyntaxHighlighter
              language={prismLanguageMap[selectedLanguage]}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: "14px 16px",
                borderRadius: 0,
                fontSize: "13px",
                fontFamily:
                  "'Fira Code', 'SF Mono', ui-monospace, monospace",
                fontWeight: 400,
                backgroundColor: "#1e1e2e",
              }}
            >
              {codeSnippets[selectedLanguage]}
            </SyntaxHighlighter>
          </div>
        </div>

        <p className="text-[12px] text-[#6b7280] text-center mt-6">
          Powered by{" "}
          <a
            href="https://zuplo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF00BD] font-semibold hover:underline"
          >
            Zuplo
          </a>
        </p>
      </div>
    </div>
  );
}
