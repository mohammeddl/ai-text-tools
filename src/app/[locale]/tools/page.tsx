"use client";
import { useState } from "react";
import ToolsHeader from "@/components/sections/tools/ToolsHeader";
import ToolNavigation from "@/components/sections/tools/ToolNavigation";
import ToolWorkspace from "@/components/sections/tools/ToolWorkspace";
import QRCodeWorkspace from "@/components/sections/tools/QRCodeWorkspace";
import Footer from "@/components/Layout/Footer/Footer";

interface Notification {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

export default function ToolsPage() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [activeTab, setActiveTab] = useState("uppercase");
  const [translationLanguage, setTranslationLanguage] = useState("es");
  const [isTranslating, setIsTranslating] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showMoreTools, setShowMoreTools] = useState(false);
  const [selectedMoreTool, setSelectedMoreTool] = useState<{
    id: string;
    icon: string;
    key: string;
    isNew?: boolean;
  } | null>(null);

  const showNotification = (message: string, type: "success" | "error" | "info") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  const handleTextTransform = async (type: string) => {
    if (!inputText.trim() && type !== "wordcount") {
      showNotification("❌ Please enter some text first", "error");
      return;
    }

    let result = "";

    switch (type) {
      case "uppercase":
        result = inputText.toUpperCase();
        break;
      case "lowercase":
        result = inputText.toLowerCase();
        break;
      case "inverse":
        result = inputText
          .split("")
          .map((char) =>
            char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
          )
          .join("");
        break;
      case "sentence":
        result = inputText.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
        break;
      case "capitalize":
        result = inputText.replace(/\b\w/g, (c) => c.toUpperCase());
        break;
      case "spongebob":
        result = inputText
          .split("")
          .map((char, i) => (i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
          .join("");
        break;
      case "randomcase":
        result = inputText
          .split("")
          .map((char) => (Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()))
          .join("");
        break;
      case "mockingcase":
        result = inputText
          .split("")
          .map((char, i) => (i % 2 === 1 ? char.toUpperCase() : char.toLowerCase()))
          .join("");
        break;
      case "leetspeak":
        const leetMap: { [key: string]: string } = {
          a: "4",
          e: "3",
          i: "1",
          o: "0",
          s: "5",
          t: "7",
          l: "1",
          A: "4",
          E: "3",
          I: "1",
          O: "0",
          S: "5",
          T: "7",
          L: "1",
        };
        result = inputText
          .split("")
          .map((char) => leetMap[char] || char)
          .join("");
        break;
      case "wordcount":
        const words = inputText.trim().split(/\s+/).filter((w) => w.length > 0);
        const chars = inputText.length;
        const charsNoSpaces = inputText.replace(/\s/g, "").length;
        const sentences = inputText.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
        const paragraphs = inputText.split(/\n\n+/).filter((p) => p.trim().length > 0).length;
        result = `📊 Text Statistics:\n\n` +
          `Words: ${words.length}\n` +
          `Characters: ${chars}\n` +
          `Characters (no spaces): ${charsNoSpaces}\n` +
          `Sentences: ${sentences}\n` +
          `Paragraphs: ${paragraphs}\n` +
          `Average word length: ${(charsNoSpaces / words.length || 0).toFixed(2)}`;
        showNotification(`✅ Analyzed ${words.length} words!`, "success");
        break;
      case "translate":
        setIsTranslating(true);
        try {
          const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
              inputText
            )}&langpair=en|${translationLanguage}`
          );
          const data = await response.json();
          result = data.responseData.translatedText;
          showNotification("✅ Translation completed!", "success");
        } catch {
          result = "❌ Translation failed. Please try again.";
          showNotification("❌ Translation failed", "error");
        } finally {
          setIsTranslating(false);
        }
        break;
      case "summarizer":
        const textSentences = inputText.match(/[^.!?]+[.!?]+/g) || [];
        if (textSentences.length <= 3) {
          result = inputText;
          showNotification("ℹ️ Text is already short enough!", "info");
        } else {
          result = textSentences.slice(0, 3).join(" ").trim();
          showNotification(
            `📝 Summarized from ${textSentences.length} to 3 sentences!`,
            "success"
          );
        }
        break;
      default:
        result = inputText;
    }

    setOutputText(result);

    if (type !== "translate" && type !== "wordcount") {
      showNotification(`✨ Text converted to ${type} successfully!`, "success");
    }
  };

  const copyToClipboard = () => {
    if (!outputText) return;
    navigator.clipboard
      .writeText(outputText)
      .then(() => {
        showNotification("✅ Text copied to clipboard!", "success");
      })
      .catch(() => {
        showNotification("❌ Failed to copy text", "error");
      });
  };

  const downloadText = () => {
    if (!outputText) return;

    try {
      const blob = new Blob([outputText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `converted-text-${activeTab}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showNotification("💾 File downloaded successfully!", "success");
    } catch {
      showNotification("❌ Failed to download file", "error");
    }
  };

  return (
    <>
      {/* Notification Container */}
      <div className="fixed top-5 right-5 z-9999 pointer-events-none">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-xl p-4 mb-2.5 shadow-lg border-l-4 animate-slide-in-right pointer-events-auto max-w-[320px] wrap-break-word ${notification.type === "success" ? "border-l-emerald-500" : ""
              } ${notification.type === "error" ? "border-l-red-500" : ""} ${notification.type === "info" ? "border-l-blue-500" : ""
              }`}
          >
            <div className="text-sm font-medium text-gray-800">{notification.message}</div>
          </div>
        ))}
      </div>

      {/* Main Section */}
      <section className="min-h-[30dvh] bg-black pt-2 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ToolsHeader />

          <ToolNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            showMoreTools={showMoreTools}
            setShowMoreTools={setShowMoreTools}
            selectedMoreTool={selectedMoreTool}
            setSelectedMoreTool={setSelectedMoreTool}
          />


          {activeTab === "qrcode" ? (
            <QRCodeWorkspace />
          ) : (
            <ToolWorkspace
              activeTab={activeTab}
              inputText={inputText}
              setInputText={setInputText}
              outputText={outputText}
              translationLanguage={translationLanguage}
              setTranslationLanguage={setTranslationLanguage}
              isTranslating={isTranslating}
              handleTextTransform={handleTextTransform}
              copyToClipboard={copyToClipboard}
              downloadText={downloadText}
            />
          )}
        </div>

      </section>
      <Footer />
    </>
  );
}
