"use client";
import { useTranslations } from "next-intl";

interface ToolInfoProps {
  activeTab: string;
}

export default function ToolInfo({ activeTab }: ToolInfoProps) {
  const t = useTranslations();

  return (
    <div className="max-w-4xl mx-auto px-4 mt-8">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
        <div className="text-center">
          <h4 className="text-white font-semibold text-xl mb-4">
            {t(`tools.items.${activeTab}.title`)}
          </h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            {t(`tools.items.${activeTab}.description`)}
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Active Tool
            </span>
            <span className="text-gray-600">|</span>
            <span>{activeTab === "qrcode" ? "QR Generator" : "Text Processor"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
