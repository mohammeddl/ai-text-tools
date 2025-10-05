"use client";
import ToolsLayout from "@/layout/ToolsLayout";
import { useTranslations } from "next-intl";
import { useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import "@/styles/tools-mobile.css";

const ToolsPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [activeTab, setActiveTab] = useState("uppercase");
  const [translationLanguage, setTranslationLanguage] = useState("es");
  const [isTranslating, setIsTranslating] = useState(false);
  const [notifications, setNotifications] = useState<Array<{id: number, message: string, type: 'success' | 'error' | 'info'}>>([]);
  const [showMoreTools, setShowMoreTools] = useState(false);
  const [selectedMoreTool, setSelectedMoreTool] = useState<{id: string, icon: string, key: string, isNew?: boolean, isReset?: boolean} | null>(null);

  // QR Code states
  const [qrStyle, setQRStyle] = useState<"classic" | "rounded" | "dots">("classic");
  const [qrColor, setQRColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const qrRef = useRef<HTMLDivElement>(null);

  // Text to Speech states
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const [speechPitch, setSpeechPitch] = useState(1);

  // Regex Tester states
  const [regexPattern, setRegexPattern] = useState("");
  const [regexFlags, setRegexFlags] = useState("g");
  const [regexMatches, setRegexMatches] = useState<RegExpMatchArray | null>(null);

  const handleTextTransform = async (type: string) => {
    if (!inputText.trim() && type !== "wordcount") return;

    let result = "";
    switch (type) {
      case "uppercase":
        result = inputText.toUpperCase();
        break;
      case "lowercase":
        result = inputText.toLowerCase();
        break;
      case "capitalize":
        result = inputText.replace(/\b\w/g, l => l.toUpperCase());
        break;
      case "inverse":
        result = inputText
          .split("")
          .map((char, index) => 
            index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
          )
          .join("");
        break;
      case "sentence":
        result = inputText.toLowerCase().replace(/(^\w|\.\s*\w)/gm, match => match.toUpperCase());
        break;
      case "spongebob":
        result = inputText
          .split("")
          .map((char) => 
            Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
          )
          .join("");
        break;
      case "randomcase":
        result = inputText
          .split("")
          .map(char => 
            Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
          )
          .join("");
        break;
      case "leetspeak":
        const leetMap: { [key: string]: string } = {
          'a': '4', 'A': '4', 'e': '3', 'E': '3', 'i': '1', 'I': '1',
          'o': '0', 'O': '0', 's': '5', 'S': '5', 't': '7', 'T': '7',
          'l': '1', 'L': '1', 'g': '9', 'G': '9'
        };
        result = inputText.replace(/[aAeEiIoOsStTlLgG]/g, match => leetMap[match] || match);
        break;
      case "mockingcase":
        let letterIndex = 0;
        result = inputText
          .split("")
          .map((char) => {
            if (char.match(/[a-zA-Z]/)) {
              const transformed = letterIndex % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
              letterIndex++;
              return transformed;
            }
            return char;
          })
          .join("");
        break;
      case "wordcount":
        const text = inputText.trim();
        const words = text ? text.split(/\s+/).length : 0;
        const characters = inputText.length;
        const charactersNoSpaces = inputText.replace(/\s/g, "").length;
        const paragraphs = text ? text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length : 0;
        const sentences = text ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;
        
        result = `📊 Text Statistics:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 Words: ${words.toLocaleString()}
🔤 Characters (with spaces): ${characters.toLocaleString()}
🔣 Characters (without spaces): ${charactersNoSpaces.toLocaleString()}
📋 Paragraphs: ${paragraphs}
📄 Sentences: ${sentences}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Additional Insights:
• Average words per sentence: ${sentences > 0 ? (words / sentences).toFixed(1) : 0}
• Average characters per word: ${words > 0 ? (charactersNoSpaces / words).toFixed(1) : 0}
• Reading time (200 WPM): ~${Math.ceil(words / 200)} minutes`;
        showNotification(`📊 Analysis complete! Found ${words} words, ${characters} characters`, 'success');
        break;
      case "translate":
        if (!inputText.trim()) return;
        setIsTranslating(true);
        try {
          const response = await fetch('/api/text/translate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              text: inputText,
              targetLang: translationLanguage
            })
          });
          
          if (!response.ok) {
            throw new Error('Translation failed');
          }
          
          const data = await response.json();
          result = data.translatedText;
          showNotification('🌐 Translation completed successfully!', 'success');
        } catch (err) {
          result = "Translation failed. Please try again or check your internet connection.";
          showNotification('❌ Translation failed. Please try again.', 'error');
          console.error("Translation error:", err);
        } finally {
          setIsTranslating(false);
        }
        break;
      case "texttospeech":
        // Text to Speech is handled separately
        return;
      case "regextester":
        // Regex Tester is handled separately
        return;
      case "summarizer":
        // Simple extractive summarization (first 3 sentences)
        const textSentences = inputText.match(/[^.!?]+[.!?]+/g) || [];
        if (textSentences.length <= 3) {
          result = inputText;
          showNotification('ℹ️ Text is already short enough!', 'info');
        } else {
          // Take first 3 sentences for summary
          result = textSentences.slice(0, 3).join(' ').trim();
          showNotification(`📝 Summarized from ${textSentences.length} to 3 sentences!`, 'success');
        }
        break;
      default:
        result = inputText;
    }
    setOutputText(result);
    
    // Show success notification for transformations (except translate and wordcount which have their own notifications)
    if (type !== 'translate' && type !== 'wordcount') {
      showNotification(`✨ Text converted to ${type} successfully!`, 'success');
    }
  };

  const downloadText = () => {
    if (!outputText) return;

    try {
      const blob = new Blob([outputText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `converted-text-${activeTab}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showNotification('💾 File downloaded successfully!', 'success');
    } catch {
      showNotification('❌ Failed to download file', 'error');
    }
  };

  const downloadQRCode = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.download = `qr-code-${Date.now()}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
      showNotification('💾 QR Code downloaded successfully!', 'success');
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const getQRLevel = (style: "classic" | "rounded" | "dots"): "L" | "M" | "Q" | "H" => {
    switch (style) {
      case "dots":
        return "H";
      case "rounded":
        return "Q";
      default:
        return "M";
    }
  };

  const copyToClipboard = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText).then(() => {
      showNotification('✅ Text copied to clipboard!', 'success');
    }).catch(() => {
      showNotification('❌ Failed to copy text', 'error');
    });
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const goBackToHome = () => {
    const locale = params.locale || 'en';
    router.push(`/${locale}`);
  };

  const handleTextToSpeech = () => {
    if (!inputText.trim()) {
      showNotification('❌ Please enter some text to speak', 'error');
      return;
    }

    if (isSpeaking) {
      // Stop speaking
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      showNotification('⏹️ Speech stopped', 'info');
      return;
    }

    // Check if browser supports Speech Synthesis
    if (!('speechSynthesis' in window)) {
      showNotification('❌ Text-to-Speech is not supported in your browser', 'error');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(inputText);
    utterance.rate = speechRate;
    utterance.pitch = speechPitch;

    utterance.onstart = () => {
      setIsSpeaking(true);
      showNotification('🔊 Speaking...', 'info');
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      showNotification('✅ Speech completed!', 'success');
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      showNotification('❌ Speech error occurred', 'error');
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleRegexTest = () => {
    if (!inputText.trim()) {
      showNotification('❌ Please enter some text to test', 'error');
      setRegexMatches(null);
      setOutputText('');
      return;
    }

    if (!regexPattern.trim()) {
      showNotification('❌ Please enter a regex pattern', 'error');
      setRegexMatches(null);
      setOutputText('');
      return;
    }

    try {
      const regex = new RegExp(regexPattern, regexFlags);
      const matches = inputText.match(regex);

      setRegexMatches(matches);

      if (matches && matches.length > 0) {
        const result = `✅ Found ${matches.length} match${matches.length > 1 ? 'es' : ''}:\n\n${matches.map((m, i) => `${i + 1}. "${m}"`).join('\n')}`;
        setOutputText(result);
        showNotification(`✅ Found ${matches.length} match${matches.length > 1 ? 'es' : ''}!`, 'success');
      } else {
        setOutputText('❌ No matches found');
        showNotification('ℹ️ No matches found', 'info');
      }
    } catch (error) {
      setRegexMatches(null);
      setOutputText(`❌ Invalid regex pattern\n\nError: ${error instanceof Error ? error.message : 'Unknown error'}`);
      showNotification('❌ Invalid regex pattern', 'error');
    }
  };

  return (
    <ToolsLayout>
      {/* Notification Container */}
      <div className="notification-container">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification ${notification.type}`}
          >
            <div style={{ 
              fontSize: '14px', 
              fontWeight: '500',
              color: '#333'
            }}>
              {notification.message}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideOutRight {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(100px);
          }
        }

        .feature-card-new {
          animation: fadeInUp 0.6s ease-out;
        }

        .fun-case-preview {
          padding: 10px;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          background-size: 400% 400%;
          animation: gradientShift 3s ease infinite;
          border-radius: 8px;
          color: white;
          font-weight: bold;
          margin-top: 10px;
          text-align: center;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .notification-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 9999;
          pointer-events: none;
        }

        .notification {
          background: white;
          border-radius: 12px;
          padding: 16px 20px;
          margin-bottom: 10px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          border-left: 4px solid #4ecdc4;
          animation: slideInRight 0.3s ease-out;
          pointer-events: auto;
          max-width: 320px;
          word-wrap: break-word;
        }

        .notification.success {
          border-left-color: #4ecdc4;
        }

        .notification.error {
          border-left-color: #ff6b6b;
        }

        .notification.info {
          border-left-color: #667eea;
        }

        .notification.removing {
          animation: slideOutRight 0.3s ease-in forwards;
        }

        .btn-processing {
          background: linear-gradient(45deg, #667eea, #764ba2) !important;
          color: white !important;
          position: relative;
          overflow: hidden;
        }

        .btn-processing::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .input-output-btn.common_btn:disabled {
          background: #cccccc !important;
          color: #666666 !important;
          cursor: not-allowed !important;
          border-color: #999999 !important;
        }

        .input-output-btn.common_btn:disabled::after {
          background: #999999 !important;
        }

        .input-output-btn.common_btn:not(:disabled) {
          background: #2c7365 !important;
          color: white !important;
          border-color: #111013 !important;
        }

        .input-output-btn.common_btn:not(:disabled):hover {
          background: #248066 !important;
        }

        .textarea-container {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .textarea-container .form-control {
          flex: 1;
          resize: none;
          min-height: 250px;
        }
      `}</style>



      {/*===============================
  TOOLS SECTION START
    ===============================*/}
      <section className='about_us' style={{ paddingTop: '10px' }}>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='section_heading mb-5 position-relative'>
                {/* Back to Home Button - positioned on the left - Hidden on mobile */}
                <button
                  onClick={goBackToHome}
                  className="back-home-btn d-flex align-items-center position-absolute d-none d-md-flex"
                  style={{
                    background: 'transparent',
                    border: '2px solid #ffffff',
                    borderRadius: '25px',
                    color: '#ffffff',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    left: '0',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: '10'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.color = '#333333';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                >
                  <span style={{ marginRight: '6px', fontSize: '16px' }}>←</span>
                  Back to Home
                </button>

                {/* Centered Title */}
                <div className="text-center">
                  <h2 data-text-animation='' data-split='word' data-duration={1} style={{ 
                    color: '#fff',
                    fontWeight: '700',
                    marginBottom: '15px'
                  }}>
                    {t("nav.tools")} Dashboard
                  </h2>
                  <p style={{ color: '#fff', fontSize: '16px' }}>{t("tools.description")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tool Navigation Tabs */}
          <div className='row' style={{ marginBottom: '15px' }}>
            <div className='col-12' style={{ marginBottom: '20px' }}>
              <div className='text-center'>
                {/* First Line - 4 Basic Tools */}
                <div className='d-flex justify-content-center align-items-center gap-3 mb-3'>
                  {[
                    { id: "uppercase", icon: "🔠", key: "uppercase" },
                    { id: "qrcode", icon: "📱", key: "qrcode", isNew: true },
                    { id: "lowercase", icon: "🔡", key: "lowercase" },
                    { id: "inverse", icon: "🔀", key: "inverse" }
                  ].map((tool) => (
                    <div key={tool.id} className="position-relative">
                      <button
                        type='button'
                        className={`common_btn ${
                          activeTab === tool.id ? 'active' : ''
                        }`}
                        onClick={() => setActiveTab(tool.id)}
                        style={{
                          backgroundColor: activeTab === tool.id ? '#ff6b6b' : 'transparent',
                          color: activeTab === tool.id ? 'white' : '#919191',
                          border: '2px solid #ff6b6b',
                          minWidth: '180px',
                          position: 'relative'
                        }}>
                        {tool.icon} {t(`tools.items.${tool.key}.title`)}
                      </button>
                      {tool.isNew && (
                        <span style={{
                          position: 'absolute',
                          top: '-8px',
                          right: '-8px',
                          background: tool.id === 'qrcode'
                            ? 'linear-gradient(45deg, #FFD700, #FFA500)'
                            : 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                          color: 'white',
                          fontSize: '10px',
                          padding: '2px 6px',
                          borderRadius: '10px',
                          fontWeight: 'bold',
                          animation: 'pulse 2s infinite'
                        }}>
                          {tool.id === 'qrcode' ? 'BEST' : 'NEW'}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Second Line - 5 Tools */}
                <div className='d-flex justify-content-center align-items-center gap-3'>
                  {[
                    { id: "sentence", icon: "📝", key: "sentence" },
                    { id: "spongebob", icon: "🧽", key: "spongebob", isNew: true },
                    { id: "randomcase", icon: "🎲", key: "randomcase", isNew: true }
                  ].map((tool) => (
                    <div key={tool.id} className="position-relative">
                      <button
                        type='button'
                        className={`common_btn ${
                          activeTab === tool.id ? 'active' : ''
                        }`}
                        onClick={() => setActiveTab(tool.id)}
                        style={{
                          backgroundColor: activeTab === tool.id ? '#ff6b6b' : 'transparent',
                          color: activeTab === tool.id ? 'white' : '#919191',
                          border: '2px solid #ff6b6b',
                          minWidth: '180px',
                          position: 'relative'
                        }}>
                        {tool.icon} {t(`tools.items.${tool.key}.title`)}
                      </button>
                      {tool.isNew && (
                        <span style={{
                          position: 'absolute',
                          top: '-8px',
                          right: '-8px',
                          background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                          color: 'white',
                          fontSize: '10px',
                          padding: '2px 6px',
                          borderRadius: '10px',
                          fontWeight: 'bold',
                          animation: 'pulse 2s infinite'
                        }}>
                          NEW
                        </span>
                      )}
                    </div>
                  ))}
                  
                  {/* Translator Tool */}
                  <div className="position-relative">
                    <button
                      type='button'
                      className={`common_btn ${
                        activeTab === "translate" ? 'active' : ''
                      }`}
                      onClick={() => setActiveTab("translate")}
                      style={{
                        backgroundColor: activeTab === "translate" ? '#ff6b6b' : 'transparent',
                        color: activeTab === "translate" ? 'white' : '#919191',
                        border: '2px solid #ff6b6b',
                        minWidth: '180px',
                        position: 'relative'
                      }}>
                      🌐 Translator
                    </button>
                    <span style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                      color: 'white',
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '10px',
                      fontWeight: 'bold',
                      animation: 'pulse 2s infinite'
                    }}>
                      NEW
                    </span>
                  </div>
                  
                  {/* More Tools Dropdown */}
                  <div className="position-relative">
                    <button
                      type='button'
                      className={`common_btn position-relative ${
                        selectedMoreTool && activeTab === selectedMoreTool.id ? 'active' : ''
                      }`}
                      onClick={() => setShowMoreTools(!showMoreTools)}
                      style={{
                        backgroundColor: (selectedMoreTool && activeTab === selectedMoreTool.id) ? '#ff6b6b' : 
                                        showMoreTools ? '#667eea' : 'transparent',
                        color: (selectedMoreTool && activeTab === selectedMoreTool.id) ? 'white' :
                               showMoreTools ? 'white' : '#919191',
                        border: (selectedMoreTool && activeTab === selectedMoreTool.id) ? '2px solid #ff6b6b' : '2px solid #667eea',
                        minWidth: '180px'
                      }}>
                      {selectedMoreTool ? (
                        <>
                          {selectedMoreTool.icon} {t(`tools.items.${selectedMoreTool.key}.title`)}
                          {selectedMoreTool.isNew && (
                            <span style={{
                              position: 'absolute',
                              top: '-8px',
                              right: '8px',
                              background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                              color: 'white',
                              fontSize: '10px',
                              padding: '2px 6px',
                              borderRadius: '10px',
                              fontWeight: 'bold',
                              animation: 'pulse 2s infinite'
                            }}>
                              NEW
                            </span>
                          )}
                        </>
                      ) : (
                        '🔧 More Tools'
                      )}
                      <span style={{ 
                        marginLeft: '8px', 
                        transform: showMoreTools ? 'rotate(180deg)' : 'rotate(0deg)',
                        display: 'inline-block',
                        transition: 'transform 0.3s ease'
                      }}>
                        ▼
                      </span>
                    </button>
                    
                    {/* Dropdown Menu */}
                    {showMoreTools && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: '0',
                        right: '0',
                        backgroundColor: 'white',
                        border: '2px solid #667eea',
                        borderTop: 'none',
                        borderRadius: '0 0 8px 8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        zIndex: 1000,
                        overflow: 'hidden'
                      }}>
                        {(() => {
                          const moreToolsOptions = [
                            { id: "regextester", icon: "🔍", key: "regextester", isNew: true },
                            { id: "texttospeech", icon: "🔊", key: "texttospeech", isNew: true },
                            { id: "summarizer", icon: "📝", key: "summarizer", isNew: true },
                            { id: "capitalize", icon: "🔤", key: "capitalize" },
                            { id: "mockingcase", icon: "😏", key: "mockingcase", isNew: true },
                            { id: "leetspeak", icon: "💻", key: "leetspeak", isNew: true },
                            { id: "wordcount", icon: "📊", key: "wordcount" }
                          ];
                          
                          // If a tool is selected, show it as "Reset to More Tools" option plus the other tools
                          const availableOptions = selectedMoreTool 
                            ? [
                                { id: "reset", icon: "🔧", key: "reset", isNew: false, isReset: true },
                                ...moreToolsOptions.filter(tool => tool.id !== selectedMoreTool.id)
                              ]
                            : moreToolsOptions;
                          
                          return availableOptions.map((tool, index) => (
                            <button
                              key={tool.id}
                              type='button'
                              className={`w-100 text-left position-relative ${
                                activeTab === tool.id ? 'active' : ''
                              }`}
                              onClick={() => {
                                if (tool.id === "reset") {
                                  setSelectedMoreTool(null);
                                  setActiveTab("uppercase"); // Reset to default tool
                                } else {
                                  setActiveTab(tool.id);
                                  setSelectedMoreTool(tool);
                                }
                                setShowMoreTools(false);
                              }}
                            style={{
                              backgroundColor: activeTab === tool.id ? '#667eea' : 'white',
                              color: activeTab === tool.id ? 'white' : '#333',
                              border: 'none',
                              padding: '12px 15px',
                              fontSize: '14px',
                              borderBottom: index < availableOptions.length - 1 ? '1px solid #e0e0e0' : 'none',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              if (activeTab !== tool.id) {
                                e.currentTarget.style.backgroundColor = '#f8f9fa';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (activeTab !== tool.id) {
                                e.currentTarget.style.backgroundColor = 'white';
                              }
                            }}>
                            <div className="d-flex align-items-center justify-content-between">
                              <span>
                                {tool.icon} {'isReset' in tool && tool.isReset ? 'More Tools' : t(`tools.items.${tool.key}.title`)}
                              </span>
                              {tool.isNew && (
                                <span style={{
                                  background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                                  color: 'white',
                                  fontSize: '9px',
                                  padding: '2px 5px',
                                  borderRadius: '8px',
                                  fontWeight: 'bold'
                                }}>
                                  NEW
                                </span>
                              )}
                            </div>
                          </button>
                        ));
                        })()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Input/Output Area or QR Code UI */}
          {activeTab === 'qrcode' ? (
            /* QR Code Generator UI */
            <div className='row'>
              <div className='col-lg-6 mb-4'>
                <div className='card' style={{ border: '2px solid #f0f0f0', borderRadius: '10px', height: '100%' }}>
                  <div className='card-header' style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e9ecef' }}>
                    <h5 className='mb-0'>📱 QR Code Settings</h5>
                  </div>
                  <div className='card-body'>
                    {/* Text Input */}
                    <div className='mb-3'>
                      <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                        Enter Text or URL
                      </label>
                      <textarea
                        className='form-control'
                        placeholder="Enter URL, text, or any content to convert to QR code..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        rows={3}
                        style={{
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          padding: '12px',
                          fontSize: '14px'
                        }}
                      />
                    </div>

                    {/* Style Selection */}
                    <div className='mb-3'>
                      <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                        QR Code Style
                      </label>
                      <div className='d-flex gap-2'>
                        {(["classic", "rounded", "dots"] as const).map((style) => (
                          <button
                            key={style}
                            onClick={() => setQRStyle(style)}
                            style={{
                              flex: 1,
                              padding: '10px',
                              border: '2px solid',
                              borderColor: qrStyle === style ? '#2c7365' : '#ddd',
                              borderRadius: '8px',
                              background: qrStyle === style ? '#2c7365' : 'white',
                              color: qrStyle === style ? 'white' : '#333',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'all 0.3s'
                            }}
                          >
                            {style.charAt(0).toUpperCase() + style.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Color Pickers */}
                    <div className='row mb-3'>
                      <div className='col-6'>
                        <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                          QR Color
                        </label>
                        <div className='d-flex align-items-center gap-2'>
                          <input
                            type='color'
                            value={qrColor}
                            onChange={(e) => setQRColor(e.target.value)}
                            style={{
                              width: '50px',
                              height: '40px',
                              border: '2px solid #ddd',
                              borderRadius: '8px',
                              cursor: 'pointer'
                            }}
                          />
                          <span style={{ fontSize: '13px', color: '#666' }}>{qrColor}</span>
                        </div>
                      </div>
                      <div className='col-6'>
                        <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                          Background
                        </label>
                        <div className='d-flex align-items-center gap-2'>
                          <input
                            type='color'
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            style={{
                              width: '50px',
                              height: '40px',
                              border: '2px solid #ddd',
                              borderRadius: '8px',
                              cursor: 'pointer'
                            }}
                          />
                          <span style={{ fontSize: '13px', color: '#666' }}>{bgColor}</span>
                        </div>
                      </div>
                    </div>

                    <div className='text-center mt-4'>
                      <button
                        className='common_btn input-output-btn'
                        onClick={() => {
                          if (inputText.trim()) {
                            setOutputText(inputText);
                            showNotification('✅ QR Code generated successfully!', 'success');
                          }
                        }}
                        disabled={!inputText.trim()}
                        style={{ width: '100%' }}
                      >
                        📱 Generate QR Code
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-lg-6 mb-4'>
                <div className='card' style={{ border: '2px solid #f0f0f0', borderRadius: '10px', height: '100%' }}>
                  <div className='card-header' style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e9ecef' }}>
                    <h5 className='mb-0'>QR Code Preview</h5>
                  </div>
                  <div className='card-body d-flex flex-column align-items-center justify-content-center'>
                    {outputText ? (
                      <>
                        <div
                          ref={qrRef}
                          className='mb-4'
                          style={{
                            padding: '20px',
                            backgroundColor: bgColor,
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                          }}
                        >
                          <QRCodeSVG
                            value={outputText}
                            size={256}
                            level={getQRLevel(qrStyle)}
                            fgColor={qrColor}
                            bgColor={bgColor}
                            includeMargin={true}
                          />
                        </div>
                        <button
                          className='common_btn input-output-btn'
                          onClick={downloadQRCode}
                          style={{ width: '80%' }}
                        >
                          💾 Download QR Code
                        </button>
                        <div className='mt-3 p-3' style={{ backgroundColor: '#f0f9ff', borderRadius: '8px', width: '100%' }}>
                          <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
                            <strong>Style:</strong> {qrStyle.charAt(0).toUpperCase() + qrStyle.slice(1)}<br />
                            <strong>Content:</strong> {outputText.substring(0, 40)}{outputText.length > 40 ? '...' : ''}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className='text-center' style={{ color: '#999' }}>
                        <div style={{ fontSize: '80px', marginBottom: '20px' }}>📱</div>
                        <p style={{ fontSize: '16px', fontWeight: '600' }}>No QR Code Yet</p>
                        <p style={{ fontSize: '14px' }}>Enter content and click Generate</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Regular Text Tools UI */
            <div className='row'>
            <div className='col-lg-6 mb-4'>
              <div className='card' style={{ border: '2px solid #f0f0f0', borderRadius: '10px', height: '100%' }}>
                <div className='card-header' style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e9ecef' }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className='mb-0'>Input Text</h5>
                    {activeTab === 'translate' && (
                      <div className="d-flex align-items-center gap-2">
                        <span style={{ fontSize: '14px', color: '#666' }}>Translate to:</span>
                        <select
                          value={translationLanguage}
                          onChange={(e) => setTranslationLanguage(e.target.value)}
                          style={{
                            padding: '5px 10px',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            fontSize: '14px'
                          }}
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
                <div className='card-body textarea-container'>
                  <textarea
                    className='form-control'
                    placeholder={`Enter your text here to convert to ${t(`tools.items.${activeTab}.title`).toLowerCase()}...`}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    style={{
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      padding: '15px',
                      fontSize: '16px',
                      lineHeight: '1.5'
                    }}
                  />
                  <div className='text-center mt-3'>
                    {activeTab === 'texttospeech' ? (
                      <>
                        {/* Text to Speech Controls */}
                        <div className='mb-3'>
                          <div className='d-flex gap-2 mb-2'>
                            <div style={{ flex: 1 }}>
                              <label style={{ fontSize: '12px', fontWeight: '600', color: '#666' }}>Speed: {speechRate}x</label>
                              <input
                                type='range'
                                min='0.5'
                                max='2'
                                step='0.1'
                                value={speechRate}
                                onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                                style={{ width: '100%' }}
                              />
                            </div>
                            <div style={{ flex: 1 }}>
                              <label style={{ fontSize: '12px', fontWeight: '600', color: '#666' }}>Pitch: {speechPitch}</label>
                              <input
                                type='range'
                                min='0.5'
                                max='2'
                                step='0.1'
                                value={speechPitch}
                                onChange={(e) => setSpeechPitch(parseFloat(e.target.value))}
                                style={{ width: '100%' }}
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          className='common_btn input-output-btn'
                          onClick={handleTextToSpeech}
                          disabled={!inputText.trim()}
                          style={{
                            background: isSpeaking ? '#ff6b6b' : '#2c7365',
                            transition: 'all 0.3s ease'
                          }}>
                          {isSpeaking ? '⏹️ Stop Speaking' : '🔊 Speak Text'}
                        </button>
                      </>
                    ) : activeTab === 'regextester' ? (
                      <>
                        {/* Regex Tester Controls */}
                        <div className='mb-3'>
                          <div className='mb-2'>
                            <label style={{ fontSize: '12px', fontWeight: '600', color: '#666', display: 'block', textAlign: 'left' }}>Pattern Templates:</label>
                            <select
                              onChange={(e) => {
                                if (e.target.value) {
                                  setRegexPattern(e.target.value);
                                }
                              }}
                              style={{
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                fontSize: '13px',
                                marginBottom: '8px',
                                cursor: 'pointer'
                              }}
                            >
                              <option value="">Select a template...</option>
                              <optgroup label="Common Patterns">
                                <option value="\d+">Numbers - \d+</option>
                                <option value="[A-Za-z]+">Letters - [A-Za-z]+</option>
                                <option value="\w+">Words - \w+</option>
                                <option value="\s+">Whitespace - \s+</option>
                              </optgroup>
                              <optgroup label="Email & Web">
                                <option value="[\w.-]+@[\w.-]+\.\w+">Email - [\w.-]+@[\w.-]+\.\w+</option>
                                <option value="https?://[^\s]+">URL - https?://[^\s]+</option>
                                <option value="www\.[^\s]+">Website - www\.[^\s]+</option>
                              </optgroup>
                              <optgroup label="Phone & Numbers">
                                <option value="\d{3}-\d{3}-\d{4}">Phone (xxx-xxx-xxxx) - \d{'{3}'}-\d{'{3}'}-\d{'{4}'}</option>
                                <option value="\(\d{3}\)\s*\d{3}-\d{4}">Phone (xxx) xxx-xxxx - \(\d{'{3}'}\)\s*\d{'{3}'}-\d{'{4}'}</option>
                                <option value="\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}">IP Address - \d{'{1,3}'}\.\d{'{1,3}'}\.\d{'{1,3}'}\.\d{'{1,3}'}</option>
                                <option value="\d{5}(-\d{4})?">ZIP Code - \d{'{5}'}(-\d{'{4}'})?</option>
                              </optgroup>
                              <optgroup label="Dates & Time">
                                <option value="\d{2}/\d{2}/\d{4}">Date (MM/DD/YYYY) - \d{'{2}'}/\d{'{2}'}/\d{'{4}'}</option>
                                <option value="\d{4}-\d{2}-\d{2}">Date (YYYY-MM-DD) - \d{'{4}'}-\d{'{2}'}-\d{'{2}'}</option>
                                <option value="\d{1,2}:\d{2}(:\d{2})?">Time - \d{'{1,2}'}:\d{'{2}'}(:\d{'{2}'})?</option>
                              </optgroup>
                              <optgroup label="Special Formats">
                                <option value="#[0-9A-Fa-f]{6}">Hex Color - #[0-9A-Fa-f]{'{6}'}</option>
                                <option value="[A-Z]{2}\d{4,}">Uppercase + Numbers - [A-Z]{'{2}'}\d{'{4,'}</option>
                                <option value="\b[A-Z][a-z]+\b">Capitalized Words - \b[A-Z][a-z]+\b</option>
                              </optgroup>
                              <optgroup label="Advanced">
                                <option value="^.+$">Entire Line - ^.+$</option>
                                <option value="(?<=\s)\w+(?=\s)">Words between spaces - (?{'<'}=\s)\w+(?=\s)</option>
                                <option value="[^,]+">Everything except commas - [^,]+</option>
                              </optgroup>
                            </select>
                          </div>
                          <div className='mb-2'>
                            <label style={{ fontSize: '12px', fontWeight: '600', color: '#666', display: 'block', textAlign: 'left' }}>Custom Pattern:</label>
                            <input
                              type='text'
                              value={regexPattern}
                              onChange={(e) => setRegexPattern(e.target.value)}
                              placeholder='e.g., \d+, [A-Z]\w+, ^hello.*'
                              style={{
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontFamily: 'monospace'
                              }}
                            />
                          </div>
                          <div className='mb-2'>
                            <label style={{ fontSize: '12px', fontWeight: '600', color: '#666', display: 'block', textAlign: 'left' }}>Flags:</label>
                            <div className='d-flex gap-2'>
                              {(['g', 'i', 'm', 'gi', 'gm', 'gim'] as const).map((flag) => (
                                <button
                                  key={flag}
                                  onClick={() => setRegexFlags(flag)}
                                  style={{
                                    flex: 1,
                                    padding: '6px 8px',
                                    border: '2px solid',
                                    borderColor: regexFlags === flag ? '#667eea' : '#ddd',
                                    borderRadius: '6px',
                                    background: regexFlags === flag ? '#667eea' : 'white',
                                    color: regexFlags === flag ? 'white' : '#333',
                                    fontWeight: '600',
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    fontFamily: 'monospace'
                                  }}
                                >
                                  {flag}
                                </button>
                              ))}
                            </div>
                            <small style={{ color: '#888', fontSize: '11px', display: 'block', marginTop: '4px', textAlign: 'left' }}>
                              g: global | i: case-insensitive | m: multiline
                            </small>
                          </div>
                        </div>
                        <button
                          className='common_btn input-output-btn'
                          onClick={handleRegexTest}
                          disabled={!inputText.trim() || !regexPattern.trim()}
                          style={{
                            transition: 'all 0.3s ease'
                          }}>
                          🔍 Test Regex
                        </button>
                      </>
                    ) : (
                      <button
                        className={`common_btn input-output-btn ${isTranslating ? 'btn-processing' : ''}`}
                        onClick={() => handleTextTransform(activeTab)}
                        disabled={!inputText.trim() && activeTab !== 'wordcount'}
                        style={{
                          pointerEvents: isTranslating ? 'none' : 'auto',
                          transition: 'all 0.3s ease'
                        }}>
                        {isTranslating ? '🔄 Translating...' :
                         activeTab === 'wordcount' ? '📊 Analyze Text' :
                         activeTab === 'translate' ? '🌐 Translate' :
                         activeTab === 'summarizer' ? '📝 Summarize Text' :
                         '🔄 Convert Text'}
                      </button>
                    )}
                    {activeTab === 'wordcount' && (
                      <div className='mt-2'>
                        <small style={{ color: '#666', fontSize: '12px' }}>
                          💡 Analyze text statistics including words, characters, paragraphs and more
                        </small>
                      </div>
                    )}
                    {activeTab === 'translate' && (
                      <div className='mt-2'>
                        <small style={{ color: '#666', fontSize: '12px' }}>
                          🌐 Powered by MyMemory 
                        </small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='col-lg-6 mb-4'>
              <div className='card' style={{ border: '2px solid #f0f0f0', borderRadius: '10px', height: '100%' }}>
                <div className='card-header' style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e9ecef' }}>
                  <h5 className='mb-0'>Output Text</h5>
                </div>
                <div className='card-body textarea-container'>
                  <textarea
                    className='form-control'
                    placeholder="Converted text will appear here..."
                    value={outputText}
                    readOnly
                    style={{
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      padding: '15px',
                      fontSize: activeTab === 'wordcount' ? '14px' : '16px',
                      lineHeight: '1.5',
                      backgroundColor: '#f9f9f9',
                      fontFamily: activeTab === 'wordcount' ? 'monospace' : 'inherit'
                    }}
                  />
                  <div className='text-center mt-3'>
                    <button
                      className='common_btn input-output-btn mx-2'
                      onClick={copyToClipboard}
                      disabled={!outputText}
                      style={{
                        transition: 'all 0.3s ease'
                      }}>
                      📋 Copy
                    </button>
                    <button
                      className='common_btn input-output-btn mx-2'
                      onClick={downloadText}
                      disabled={!outputText}
                      style={{
                        transition: 'all 0.3s ease'
                      }}>
                      💾 Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Current Tool Info */}
          <div className='row '>
            <div className='col-12 mb-4'>
              <div className='text-center p-4' style={{ 
                backgroundColor: '#f8f9fa', 
                borderRadius: '15px',
                border: '1px solid #e9ecef'
              }}>
                <h4 style={{ 
                  color: '#333', 
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>
                  {t(`tools.items.${activeTab}.title`)}
                </h4>
                <p className='lead' style={{ 
                  color: '#666',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  margin: '0'
                }}>
                  {t(`tools.items.${activeTab}.description`)}
                </p>
                
                {/* Fun previews for new case modes */}
                {(activeTab === 'spongebob' || activeTab === 'randomcase' || activeTab === 'mockingcase' || activeTab === 'leetspeak') && (
                  <div className="fun-case-preview">
                    {activeTab === 'spongebob' && 'tHiS iS hOw SpOnGeBob TeXt LoOkS!'}
                    {activeTab === 'randomcase' && 'ThIs Is RaNdOm CaSe TeXt!'}
                    {activeTab === 'mockingcase' && 'tHiS iS mOcKiNg CaSe TeXt!'}
                    {activeTab === 'leetspeak' && '7h15 15 l337 5p34k 73x7!'}
                  </div>
                )}
                
                {/* Translation info */}
                {activeTab === 'translate' && (
                  <div style={{
                    marginTop: '15px',
                    padding: '15px',
                    backgroundColor: '#e8f4fd',
                    borderRadius: '10px',
                    border: '1px solid #bee5eb'
                  }}>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span style={{ fontSize: '16px' }}>🌍</span>
                      <strong style={{ color: '#0c5460' }}>Translation Features:</strong>
                    </div>
                    <ul style={{ margin: '0', paddingLeft: '20px', color: '#0c5460' }}>
                      <li>🆓 Free 1000 words per day</li>
                      <li>🔒 No signup or registration required</li>
                      <li>⚡ Instant translation results</li>
                      <li>🌐 Support for 12+ languages</li>
                      <li>🔄 Powered by MyMemory API</li>
                    </ul>
                  </div>
                )}
                
                {/* Word Count info */}
                {activeTab === 'wordcount' && (
                  <div style={{
                    marginTop: '15px',
                    padding: '15px',
                    backgroundColor: '#f0f9ff',
                    borderRadius: '10px',
                    border: '1px solid #bfdbfe'
                  }}>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span style={{ fontSize: '16px' }}>📊</span>
                      <strong style={{ color: '#1e40af' }}>Analysis Includes:</strong>
                    </div>
                    <ul style={{ margin: '0', paddingLeft: '20px', color: '#1e40af' }}>
                      <li>📝 Word count with formatting</li>
                      <li>🔤 Character count (with/without spaces)</li>
                      <li>📋 Paragraph and sentence analysis</li>
                      <li>⏱️ Estimated reading time</li>
                      <li>📈 Text complexity metrics</li>
                    </ul>
                  </div>
                )}

                {/* QR Code info */}
                {activeTab === 'qrcode' && (
                  <div style={{
                    marginTop: '15px',
                    padding: '15px',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '10px',
                    border: '1px solid #bbf7d0'
                  }}>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span style={{ fontSize: '16px' }}>📱</span>
                      <strong style={{ color: '#166534' }}>QR Code Features:</strong>
                    </div>
                    <ul style={{ margin: '0', paddingLeft: '20px', color: '#166534' }}>
                      <li>✨ Instant QR code generation</li>
                      <li>🎨 3 different styles: Classic, Rounded, Dots</li>
                      <li>🌈 Customizable colors for QR and background</li>
                      <li>💾 Download as high-quality PNG image</li>
                      <li>🔒 100% secure - all processing is local</li>
                      <li>📲 Works with URLs, text, WiFi, contacts, and more</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*===============================
  TOOLS SECTION END
    ===============================*/}

      {/*===============================
  UPCOMING FEATURES SECTION START
    ===============================*/}
      <section className='about_us pt_120 xs_pt_70 pb_120 xs_pb_70' style={{ backgroundColor: '#f8f9fa' }}>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-8 text-center'>
              <div className='section_heading'>
                <h5 style={{ color: '#ff6b6b', fontWeight: '600', textTransform: 'uppercase', fontSize: '14px', letterSpacing: '2px' }}>
                  {t("upcomingFeatures.subtitle")}
                </h5>
                <h2 data-text-animation='' data-split='word' style={{ 
                  color: '#333', 
                  fontWeight: '700',
                  marginTop: '10px',
                  marginBottom: '20px'
                }}>
                  {t("upcomingFeatures.title")}
                </h2>
                <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6' }}>
                  {t("upcomingFeatures.description")}
                </p>
              </div>
            </div>
          </div>

          <div className='row mt-5'>
            {[
              { key: "aiSummarization" },
              { key: "contentOptimization" },
              { key: "voiceToText" },
              { key: "multilanguageAI" },
              { key: "sentimentAnalysis" },
              { key: "advancedFormatting", isRecent: true }
            ].map((feature) => (
              <div key={feature.key} className='col-lg-4 col-md-6 mb-4'>
                <div className='upcoming-feature-card position-relative overflow-hidden' style={{ 
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  padding: '30px 20px',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '1px solid #f0f0f0',
                  minHeight: '280px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.08)';
                }}>
                  {/* Coming Soon Badge */}
                  <div className='position-absolute' style={{
                    top: '15px',
                    right: '15px',
                    backgroundColor: '#ff6b6b',
                    color: 'white',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {t("upcomingFeatures.comingSoon")}
                  </div>
                  
                  {/* Icon */}
                  <div className='text-center mb-3'>
                    <div style={{ 
                      fontSize: '4rem', 
                      marginBottom: '1rem',
                      filter: 'grayscale(50%) opacity(0.8)'
                    }}>
                      {t(`upcomingFeatures.items.${feature.key}.icon`)}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className='text-center'>
                    <h4 style={{ 
                      color: '#333',
                      marginBottom: '15px',
                      fontSize: '1.3rem',
                      fontWeight: '600'
                    }}>
                      {t(`upcomingFeatures.items.${feature.key}.title`)}
                    </h4>
                    <p style={{ 
                      color: '#666',
                      lineHeight: '1.6',
                      fontSize: '14px',
                      margin: '0'
                    }}>
                      {t(`upcomingFeatures.items.${feature.key}.description`)}
                    </p>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className='position-absolute' style={{
                    bottom: '0',
                    left: '0',
                    width: '100%',
                    height: '4px',
                    background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4)',
                    opacity: '0.3'
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/*===============================
  UPCOMING FEATURES SECTION END
          {/*===============================
  UPCOMING FEATURES SECTION END
    ===============================*/}

    </ToolsLayout>
  );
};

export default ToolsPage;
