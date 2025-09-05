"use client";
import ToolsLayout from "@/layout/ToolsLayout";
import { useTranslations } from "next-intl";
import { useState } from "react";

const ToolsPage = () => {
  const t = useTranslations();
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [activeTab, setActiveTab] = useState("uppercase");
  const [translationLanguage, setTranslationLanguage] = useState("es");
  const [isTranslating, setIsTranslating] = useState(false);
  const [notifications, setNotifications] = useState<Array<{id: number, message: string, type: 'success' | 'error' | 'info'}>>([]);
  const [showMoreTools, setShowMoreTools] = useState(false);
  const [selectedMoreTool, setSelectedMoreTool] = useState<{id: string, icon: string, key: string, isNew?: boolean, isReset?: boolean} | null>(null);

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
              <div className='section_heading text-center mb-5'>
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

          {/* Tool Navigation Tabs */}
          <div className='row' style={{ marginBottom: '15px' }}>
            <div className='col-12' style={{ marginBottom: '20px' }}>
              <div className='text-center'>
                {/* First Line - 4 Basic Tools */}
                <div className='d-flex justify-content-center align-items-center gap-3 mb-3'>
                  {[
                    { id: "uppercase", icon: "🔠", key: "uppercase" },
                    { id: "lowercase", icon: "🔡", key: "lowercase" },
                    { id: "capitalize", icon: "🔤", key: "capitalize" },
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
                            { id: "mockingcase", icon: "😏", key: "mockingcase", isNew: true },
                            { id: "leetspeak", icon: "💻", key: "leetspeak", isNew: true }
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
                              borderBottom: index < 2 ? '1px solid #e0e0e0' : 'none',
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

          {/* Text Input/Output Area */}
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
                       '🔄 Convert Text'}
                    </button>
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

          {/* Current Tool Info */}
          <div className='row mt-5'>
            <div className='col-12'>
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
