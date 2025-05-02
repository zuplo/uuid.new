import { Button } from "@/components/ui/button";
import { Check, Copy, Braces, Code } from "lucide-react";
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

  // Map our language keys to Prism's language keys
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
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white mb-6"
          size="lg"
        >
          Generate New UUID
        </Button>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Code className="h-4 w-4 mr-2 text-pink-500" />
              <span className="text-sm font-semibold">API Examples</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-pink-500"
              onClick={copySnippet}
            >
              {snippetCopied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="sr-only">Copy Code Snippet</span>
            </Button>
          </div>

          <div className="mb-3">
            <CustomSelect
              value={selectedLanguage}
              onValueChange={(value) =>
                setSelectedLanguage(value as keyof typeof prismLanguageMap)
              }
            >
              <CustomSelectTrigger className="w-full bg-gray-700 border-gray-600">
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

          <div className="rounded overflow-hidden">
            <SyntaxHighlighter
              language={prismLanguageMap[selectedLanguage]}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: "0.75rem",
                borderRadius: "0.25rem",
                fontSize: "0.875rem",
                backgroundColor: "#1a1a1a",
              }}
            >
              {codeSnippets[selectedLanguage]}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
}
