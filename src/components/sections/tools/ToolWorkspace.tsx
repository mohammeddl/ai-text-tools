"use client";

interface ToolWorkspaceProps {
  activeTab: string;
  inputText: string;
  setInputText: (text: string) => void;
  outputText: string;
  translationLanguage: string;
  setTranslationLanguage: (lang: string) => void;
  isTranslating: boolean;
  handleTextTransform: (type: string) => void;
  copyToClipboard: () => void;
  downloadText: () => void;
}

export default function ToolWorkspace({
  activeTab,
  inputText,
  setInputText,
  outputText,
  translationLanguage,
  setTranslationLanguage,
  isTranslating,
  handleTextTransform,
  copyToClipboard,
  downloadText,
}: ToolWorkspaceProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto px-4">
      {/* Input Card */}
      <div className="bg-white rounded-2xl shadow-lg">
        <div className="px-5 py-3 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-900 font-semibold text-base">Input Text</h3>
            {activeTab === "translate" && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">Translate to:</span>
                <select
                  value={translationLanguage}
                  onChange={(e) => setTranslationLanguage(e.target.value)}
                  className="bg-white border border-gray-300 rounded px-2 py-1 text-gray-900 text-xs focus:border-blue-400 focus:outline-none"
                >
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="it">Italian</option>
                  <option value="pt">Portuguese</option>
                  <option value="ru">Russian</option>
                  <option value="ja">Japanese</option>
                  <option value="ko">Korean</option>
                  <option value="zh">Chinese</option>
                  <option value="ar">Arabic</option>
                  <option value="hi">Hindi</option>
                  <option value="nl">Dutch</option>
                </select>
              </div>
            )}
          </div>
        </div>
        <div className="p-5">
          <textarea
            className="w-full bg-white border-2 border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm placeholder-gray-400 focus:border-blue-400 outline-none resize-none h-64"
            placeholder={`Enter your text here to convert to ${activeTab}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="mt-4 flex justify-center">
            <button
              className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2.5 px-8 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm"
              onClick={() => handleTextTransform(activeTab)}
              disabled={!inputText.trim() && activeTab !== "wordcount"}
            >
              <span className="text-base">🔄</span>
              {isTranslating
                ? "Translating..."
                : activeTab === "wordcount"
                ? "Analyze Text"
                : activeTab === "translate"
                ? "Translate"
                : activeTab === "summarizer"
                ? "Summarize Text"
                : "Convert Text"}
              <span className="text-base">✕</span>
            </button>
          </div>
          {activeTab === "translate" && (
            <div className="mt-2 text-center">
              <small className="text-gray-500 text-xs">🌐 Powered by MyMemory</small>
            </div>
          )}
        </div>
      </div>

      {/* Output Card */}
      <div className="bg-white rounded-2xl shadow-lg">
        <div className="px-5 py-3 border-b border-gray-200">
          <h3 className="text-gray-900 font-semibold text-base">Output Text</h3>
        </div>
        <div className="p-5">
          <textarea
            className={`w-full bg-gray-50 border-2 border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm placeholder-gray-400 outline-none resize-none h-64 ${
              activeTab === "wordcount" ? "font-mono text-xs" : ""
            }`}
            placeholder="Converted text will appear here..."
            value={outputText}
            readOnly
          />
          <div className="flex gap-3 mt-4 justify-center">
            <button
              className="bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2.5 px-6 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm"
              onClick={copyToClipboard}
              disabled={!outputText}
            >
              <span className="text-base">📋</span>
              Copy
              <span className="text-base">✕</span>
            </button>
            <button
              className="bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2.5 px-6 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm"
              onClick={downloadText}
              disabled={!outputText}
            >
              <span className="text-base">💾</span>
              Download
              <span className="text-base">✕</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
