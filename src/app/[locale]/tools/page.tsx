"use client";
import ToolsLayout from "@/layout/ToolsLayout";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface Props {
  params: { locale: string };
}

const ToolsPage = ({ }: Props) => {
  const t = useTranslations();
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [activeTab, setActiveTab] = useState("uppercase");

  const handleTextTransform = (type: string) => {
    if (!inputText.trim()) return;

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
      default:
        result = inputText;
    }
    setOutputText(result);
  };

  const downloadText = () => {
    if (!outputText) return;
    
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted-text-${activeTab}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
  };

  return (
    <ToolsLayout>

      {/*===============================
  TOOLS SECTION START
    ===============================*/}
      <section className='about_us pt_120 xs_pt_70 pb_120 xs_pb_70'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='section_heading text-center mb-5'>
                <h2 data-text-animation='' data-split='word' data-duration={1} style={{ 
                  color: '#333',
                  fontWeight: '700',
                  marginBottom: '15px'
                }}>
                  {t("nav.tools")} Dashboard
                </h2>
                <p style={{ color: '#666', fontSize: '16px' }}>{t("tools.description")}</p>
              </div>
            </div>
          </div>

          {/* Tool Navigation Tabs */}
          <div className='row mb-5'>
            <div className='col-12'>
              <div className='text-center'>
                <div className='btn-group' role='group'>
                  {[
                    { id: "uppercase", icon: "🔠", key: "uppercase" },
                    { id: "lowercase", icon: "🔡", key: "lowercase" },
                    { id: "capitalize", icon: "🔤", key: "capitalize" },
                    { id: "inverse", icon: "🔀", key: "inverse" },
                    { id: "sentence", icon: "📝", key: "sentence" }
                  ].map((tool) => (
                    <button
                      key={tool.id}
                      type='button'
                      className={`common_btn mx-2 mb-3 ${
                        activeTab === tool.id ? 'active' : ''
                      }`}
                      onClick={() => setActiveTab(tool.id)}
                      style={{
                        backgroundColor: activeTab === tool.id ? '#ff6b6b' : 'transparent',
                        color: activeTab === tool.id ? 'white' : '#333',
                        border: '2px solid #ff6b6b'
                      }}>
                      {tool.icon} {t(`tools.items.${tool.key}.title`)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Text Input/Output Area */}
          <div className='row'>
            <div className='col-lg-6 mb-4'>
              <div className='card' style={{ border: '2px solid #f0f0f0', borderRadius: '10px' }}>
                <div className='card-header' style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e9ecef' }}>
                  <h5 className='mb-0'>Input Text</h5>
                </div>
                <div className='card-body'>
                  <textarea
                    className='form-control'
                    placeholder={`Enter your text here to convert to ${t(`tools.items.${activeTab}.title`).toLowerCase()}...`}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={8}
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
                      className='common_btn'
                      onClick={() => handleTextTransform(activeTab)}
                      disabled={!inputText.trim()}>
                      Convert Text
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-lg-6 mb-4'>
              <div className='card' style={{ border: '2px solid #f0f0f0', borderRadius: '10px' }}>
                <div className='card-header' style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e9ecef' }}>
                  <h5 className='mb-0'>Output Text</h5>
                </div>
                <div className='card-body'>
                  <textarea
                    className='form-control'
                    placeholder='Converted text will appear here...'
                    value={outputText}
                    readOnly
                    rows={8}
                    style={{
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      padding: '15px',
                      fontSize: '16px',
                      lineHeight: '1.5',
                      backgroundColor: '#f9f9f9'
                    }}
                  />
                  <div className='text-center mt-3'>
                    <button
                      className='common_btn mx-2'
                      onClick={copyToClipboard}
                      disabled={!outputText}>
                      📋 Copy
                    </button>
                    <button
                      className='common_btn mx-2'
                      onClick={downloadText}
                      disabled={!outputText}>
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
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*===============================
  TOOLS SECTION END
    ===============================*/}

      {/*===============================
  FEATURES SECTION START
    ===============================*/}
      <section className='latest_project pt_120 xs_pt_70 pb_120 xs_pb_70'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-8 text-center'>
              <div className='section_heading'>
                <h5 style={{ color: '#ff6b6b', fontWeight: '600', textTransform: 'uppercase', fontSize: '14px', letterSpacing: '2px' }}>
                  {t("features.subtitle")}
                </h5>
                <h2 data-text-animation='' data-split='word' style={{ 
                  color: '#333', 
                  fontWeight: '700',
                  marginTop: '10px',
                  marginBottom: '20px'
                }}>
                  {t("features.title")}
                </h2>
                <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6' }}>
                  {t("features.description")}
                </p>
              </div>
            </div>
          </div>

          <div className='row mt-5'>
            {[
              { icon: "⚡", key: "instant" },
              { icon: "🔒", key: "secure" },
              { icon: "🆓", key: "free" }
            ].map((feature) => (
              <div key={feature.key} className='col-lg-4 col-md-6 mb-4'>
                <div className='text-center p-4' style={{ 
                  backgroundColor: 'white',
                  borderRadius: '15px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    {feature.icon}
                  </div>
                  <h4 style={{ 
                    color: '#333', 
                    fontWeight: '600',
                    marginBottom: '15px',
                    fontSize: '1.3rem'
                  }}>
                    {t(`features.items.${feature.key}.title`)}
                  </h4>
                  <p style={{ 
                    color: '#666',
                    lineHeight: '1.6',
                    fontSize: '14px',
                    margin: '0'
                  }}>
                    {t(`features.items.${feature.key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/*===============================
  FEATURES SECTION END
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
              { key: "grammar" },
              { key: "slugify" },
              { key: "wordCount" },
              { key: "translation" },
              { key: "funCases" }
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
