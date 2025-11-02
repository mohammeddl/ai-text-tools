"use client";
import { useTranslations } from "next-intl";

interface ToolNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showMoreTools: boolean;
  setShowMoreTools: (show: boolean) => void;
  selectedMoreTool: { id: string; icon: string; key: string; isNew?: boolean } | null;
  setSelectedMoreTool: (tool: { id: string; icon: string; key: string; isNew?: boolean } | null) => void;
}

export default function ToolNavigation({
  activeTab,
  setActiveTab,
  showMoreTools,
  setShowMoreTools,
  selectedMoreTool,
  setSelectedMoreTool,
}: ToolNavigationProps) {
  const t = useTranslations();

  const mainTools = [
    { id: "uppercase", icon: "🔠", key: "uppercase" },
    { id: "qrcode", icon: "📱", key: "qrcode", isBest: true },
    { id: "lowercase", icon: "🔡", key: "lowercase" },
    { id: "inverse", icon: "🔀", key: "inverse" },
  ];

  const secondRowTools = [
    { id: "sentence", icon: "📝", key: "sentence" },
    { id: "spongebob", icon: "🧽", key: "spongebob", isNew: true },
    { id: "randomcase", icon: "🎲", key: "randomcase", isNew: true },
    { id: "translate", icon: "🌐", key: "translate", isNew: true },
  ];

  const moreToolsOptions = [
    { id: "regextester", icon: "🔍", key: "regextester", isNew: true },
    { id: "texttospeech", icon: "🔊", key: "texttospeech", isNew: true },
    { id: "summarizer", icon: "📝", key: "summarizer", isNew: true },
    { id: "capitalize", icon: "🔤", key: "capitalize" },
    { id: "mockingcase", icon: "😏", key: "mockingcase", isNew: true },
    { id: "leetspeak", icon: "💻", key: "leetspeak", isNew: true },
    { id: "wordcount", icon: "📊", key: "wordcount" },
  ];

  return (
    <div className="mb-12 max-w-7xl mx-auto px-4">
      {/* First Row */}
      <div className="flex flex-wrap gap-3 justify-center mb-3">
        {mainTools.map((tool) => (
          <div key={tool.id} className="relative">
            <button
              type="button"
              onClick={() => setActiveTab(tool.id)}
              className={`relative px-x py-2 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                activeTab === tool.id
                  ? "bg-red-400 text-white"
                  : "bg-black text-gray-300 border border-cyan-500 hover:border-cyan-400"
              }`}
            >
              <span className="text-base ">{tool.icon}</span>
              <span>{t(`tools.items.${tool.key}.title`)}</span>
              <span className="text-base">✕</span>
            </button>
            {tool.isBest && (
              <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded text-xs font-bold bg-yellow-400 text-black">
                BEST
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Second Row */}
      <div className="flex flex-wrap gap-3 justify-center">
        {secondRowTools.map((tool) => (
          <div key={tool.id} className="relative">
            <button
              type="button"
              onClick={() => setActiveTab(tool.id)}
              className={`relative px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                activeTab === tool.id
                  ? "bg-red-400 text-white"
                  : "bg-black text-gray-300 border border-red-500 hover:border-red-400"
              }`}
            >
              <span className="text-base">{tool.icon}</span>
              <span>{tool.id === "translate" ? "Translator" : t(`tools.items.${tool.key}.title`)}</span>
              <span className="text-base">✕</span>
            </button>
            {tool.isNew && (
              <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded text-xs font-bold bg-red-500 text-white">
                NEW
              </span>
            )}
          </div>
        ))}

        {/* More Tools Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowMoreTools(!showMoreTools)}
            className={`relative px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
              selectedMoreTool && activeTab === selectedMoreTool.id
                ? "bg-red-400 text-white"
                : "bg-black text-gray-300 border border-blue-600 hover:border-blue-500"
            }`}
          >
            {selectedMoreTool ? (
              <>
                <span className="text-base">{selectedMoreTool.icon}</span>
                <span>{t(`tools.items.${selectedMoreTool.key}.title`)}</span>
              </>
            ) : (
              <>
                <span className="text-base">🔧</span>
                <span>More Tools</span>
              </>
            )}
            <span className={`text-sm transition-transform duration-300 ${showMoreTools ? "rotate-180" : ""}`}>
              ▼
            </span>
            <span className="text-base ml-1">✕</span>
          </button>

          {/* Dropdown Menu */}
          {showMoreTools && (
            <div className="absolute top-full mt-2 left-0 w-full bg-gray-900 border-2 border-gray-700 rounded-lg shadow-2xl z-50 overflow-hidden">
              {(selectedMoreTool
                ? [
                    { id: "reset", icon: "🔧", key: "reset", isReset: true },
                    ...moreToolsOptions.filter((tool) => tool.id !== selectedMoreTool.id),
                  ]
                : moreToolsOptions
              ).map((tool) => (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => {
                    if (tool.id === "reset") {
                      setSelectedMoreTool(null);
                      setActiveTab("uppercase");
                    } else {
                      setActiveTab(tool.id);
                      setSelectedMoreTool(tool);
                    }
                    setShowMoreTools(false);
                  }}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors border-b border-gray-800 last:border-b-0 ${
                    activeTab === tool.id
                      ? "bg-blue-900 text-white"
                      : "bg-gray-900 hover:bg-gray-800 text-gray-300"
                  }`}
                >
                  <span className="text-lg">{tool.icon}</span>
                  <span className="flex-1">
                    {"isReset" in tool && tool.isReset
                      ? "More Tools"
                      : t(`tools.items.${tool.key}.title`)}
                  </span>
                  {"isNew" in tool && tool.isNew && (
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-400 text-white">
                      NEW
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
