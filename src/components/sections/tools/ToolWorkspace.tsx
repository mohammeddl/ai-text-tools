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
      <div className="bg-black border-2 border-[#fff9cb] shadow-[0_0_15px_rgba(255,249,203,0.3)]">
        <div className="px-5 py-3 border-b-2 border-[#fff9cb]/30 bg-gray-900/50">
          <div className="flex justify-between items-center">
            <h3 className="text-[#fff9cb] font-bold text-base uppercase tracking-wider">Input Text</h3>
            {activeTab === "translate" && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#fff9cb]">Translate to:</span>
                <select
                  value={translationLanguage}
                  onChange={(e) => setTranslationLanguage(e.target.value)}
                  className="bg-black border border-[#fff9cb] px-2 py-1 text-[#fff9cb] text-xs focus:border-[#fff9cb] focus:outline-none focus:shadow-[0_0_10px_rgba(255,249,203,0.2)]"
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
            className="w-full bg-black border-2 border-[#fff9cb] px-4 py-3 text-[#fff9cb] text-sm placeholder-[#fff9cb]/50 focus:border-[#fff9cb] outline-none resize-none h-64 font-mono focus:shadow-[0_0_10px_rgba(255,249,203,0.2)] transition-all"
            placeholder={`Enter your text here to convert to ${activeTab}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="mt-4 flex justify-center">
            <button
              className="bg-black border-2 border-[#fff9cb] text-[#fff9cb] hover:bg-[#fff9cb] hover:text-black hover:shadow-[0_0_20px_rgba(255,249,203,0.4)] disabled:opacity-50 disabled:cursor-not-allowed font-bold uppercase tracking-wide py-3 px-8 transition-all duration-200 flex items-center gap-2 text-sm"
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
              <span className="text-base">➜</span>
            </button>
          </div>
          {activeTab === "translate" && (
            <div className="mt-2 text-center">
              <small className="text-[#fff9cb]/60 text-xs">🌐 Powered by MyMemory</small>
            </div>
          )}
        </div>
      </div>

      {/* Output Card */}
      <div className="bg-black border-2 border-[#fff9cb] shadow-[0_0_15px_rgba(255,249,203,0.3)]">
        <div className="px-5 py-3 border-b-2 border-[#fff9cb]/30 bg-gray-900/50">
          <h3 className="text-[#fff9cb] font-bold text-base uppercase tracking-wider">Output Text</h3>
        </div>
        <div className="p-5">
          <textarea
            className={`w-full bg-black border-2 border-[#fff9cb] px-4 py-3 text-[#fff9cb] text-sm placeholder-[#fff9cb]/50 outline-none resize-none h-64 font-mono focus:shadow-[0_0_10px_rgba(255,249,203,0.2)] transition-all ${activeTab === "wordcount" ? "text-xs" : ""
              }`}
            placeholder="Converted text will appear here..."
            value={outputText}
            readOnly
          />
          <div className="flex gap-3 mt-4 justify-center">
            <button
              className="bg-black border-2 border-[#fff9cb] text-[#fff9cb] hover:bg-[#fff9cb] hover:text-black hover:shadow-[0_0_20px_rgba(255,249,203,0.4)] disabled:opacity-50 disabled:cursor-not-allowed font-bold uppercase tracking-wide py-3 px-6 transition-all duration-200 flex items-center gap-2 text-sm"
              onClick={copyToClipboard}
              disabled={!outputText}
            >
              <span className="text-base">📋</span>
              Copy
              <span className="text-base">➜</span>
            </button>
            <button
              className="bg-black border-2 border-[#fff9cb] text-[#fff9cb] hover:bg-[#fff9cb] hover:text-black hover:shadow-[0_0_20px_rgba(255,249,203,0.4)] disabled:opacity-50 disabled:cursor-not-allowed font-bold uppercase tracking-wide py-3 px-6 transition-all duration-200 flex items-center gap-2 text-sm"
              onClick={downloadText}
              disabled={!outputText}
            >
              <span className="text-base">💾</span>
              Download
              <span className="text-base">➜</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
