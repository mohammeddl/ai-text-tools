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
    { id: "sentence", icon: "📝", key: "sentence" },
    { id: "spongebob", icon: "🧽", key: "spongebob", isNew: true },
    { id: "capitalize", icon: "🔤", key: "capitalize" },
  ];

  const secondRowTools = [
    { id: "randomcase", icon: "🎲", key: "randomcase", isNew: true },
    { id: "translate", icon: "🌐", key: "translate", isNew: true },
  ];

  const moreToolsOptions = [
    { id: "regextester", icon: "🔍", key: "regextester", isNew: true },
    { id: "texttospeech", icon: "🔊", key: "texttospeech", isNew: true },
    { id: "summarizer", icon: "📝", key: "summarizer", isNew: true },
    { id: "mockingcase", icon: "😏", key: "mockingcase", isNew: true },
    { id: "leetspeak", icon: "💻", key: "leetspeak", isNew: true },
    { id: "wordcount", icon: "📊", key: "wordcount" },
  ];

  return (
    <div className="mb-12 max-w-7xl mx-auto px-4">
      {/* All buttons in one grid: 3 columns on mobile, flex on desktop */}
      <div className="grid grid-cols-3 md:flex md:flex-wrap gap-2 md:gap-3 md:justify-center">
        {/* Main Tools */}
        {mainTools.map((tool) => (
          <div key={tool.id} className="relative">
            <button
              type="button"
              onClick={() => setActiveTab(tool.id)}
              className={`w-full relative px-3 py-2 md:px-5 md:py-3 font-semibold text-xs md:text-sm transition-all duration-300 flex items-center justify-center gap-1.5 md:gap-2.5 hover:scale-105 border-2 ${activeTab === tool.id
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/50 border-pink-500"
                  : "bg-black text-gray-300 border-pink-500 hover:border-pink-400 hover:bg-gray-900"
                }`}
            >
              <span className="text-base md:text-lg">{tool.icon}</span>
              <span className="whitespace-nowrap hidden md:inline">{t(`tools.items.${tool.key}.title`)}</span>
            </button>
            {tool.isBest && (
              <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-none text-xs font-bold bg-yellow-400 text-black">
                BEST
              </span>
            )}
          </div>
        ))}

        {/* Second Row Tools */}
        {secondRowTools.map((tool) => (
          <div key={tool.id} className="relative">
            <button
              type="button"
              onClick={() => setActiveTab(tool.id)}
              className={`w-full relative px-3 py-2 md:px-5 md:py-3 font-semibold text-xs md:text-sm transition-all duration-300 flex items-center justify-center gap-1.5 md:gap-2.5 hover:scale-105 border-2 ${activeTab === tool.id
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/50 border-pink-500"
                  : "bg-black text-gray-300 border-pink-500 hover:border-pink-400 hover:bg-gray-900"
                }`}
            >
              <span className="text-base md:text-lg">{tool.icon}</span>
              <span className="whitespace-nowrap hidden md:inline">{tool.id === "translate" ? "Translator" : t(`tools.items.${tool.key}.title`)}</span>
            </button>
            {tool.isNew && (
              <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-none text-xs font-bold bg-gray-600 text-white border border-pink-500">
                NEW
              </span>
            )}
          </div>
        ))}

        {/* More Tools Dropdown - spans 3 columns on mobile */}
        <div className="relative col-span-3 md:col-span-1">
          <button
            type="button"
            onClick={() => setShowMoreTools(!showMoreTools)}
            className={`w-full relative px-3 py-2 md:px-5 md:py-3 font-semibold text-xs md:text-sm transition-all duration-300 flex items-center justify-center gap-1.5 md:gap-2.5 hover:scale-105 border-2 ${selectedMoreTool && activeTab === selectedMoreTool.id
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50 border-blue-500"
                : "bg-black text-gray-300 border-blue-500 hover:border-blue-400 hover:bg-gray-900"
              }`}
          >
            {selectedMoreTool ? (
              <>
                <span className="text-base md:text-lg">{selectedMoreTool.icon}</span>
                <span className="whitespace-nowrap hidden md:inline">{t(`tools.items.${selectedMoreTool.key}.title`)}</span>
              </>
            ) : (
              <>
                <span className="text-base md:text-lg">🔧</span>
                <span className="whitespace-nowrap">More Tools</span>
              </>
            )}
            <span className={`text-xs md:text-sm transition-transform duration-300 ${showMoreTools ? "rotate-180" : ""}`}>
              ▼
            </span>
          </button>

          {/* Dropdown Menu */}
          {showMoreTools && (
            <div className="absolute top-full mt-2 left-0 w-full bg-black border-2 border-blue-500 shadow-2xl z-50 overflow-hidden">
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
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors border-b border-gray-800 last:border-b-0 ${activeTab === tool.id
                      ? "bg-blue-600 text-white"
                      : "bg-black hover:bg-gray-900 text-gray-300 hover:text-white"
                    }`}
                >
                  <span className="text-lg">{tool.icon}</span>
                  <span className="flex-1">
                    {"isReset" in tool && tool.isReset
                      ? "More Tools"
                      : t(`tools.items.${tool.key}.title`)}
                  </span>
                  {"isNew" in tool && tool.isNew && (
                    <span className="px-2 py-0.5 rounded-none text-xs font-bold bg-pink-500 text-white">
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
