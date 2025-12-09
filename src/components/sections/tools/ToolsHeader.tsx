"use client";
import { useTranslations } from "next-intl";
import { useViewTransition } from "@/hooks/useViewTransition";

export default function ToolsHeader() {
  const t = useTranslations();
  const { navigateWithTransition } = useViewTransition();

  const goBackToHome = () => {
    navigateWithTransition("/");
  };

  return (
    <div className="mb-6 relative z-50">
      {/* Back to Home Button */}
      <div className="">
        <button
          onClick={goBackToHome}
          className="flex items-center gap-2 px-6 py-3 bg-transparent cursor-pointer border-2 border-white rounded-lg text-white hover:bg-white hover:text-black transition-all duration-300 text-base"
        >
          <span className="text-lg ">←</span>
          Back to Home
        </button>
      </div>

      {/* Title */}
      <div className="text-center">
        <h1 className="text-white font-bold text-4xl md:text-7xl mb-2">
          Tools Dashboard
        </h1>
        <p className="text-gray-400 text-sm md:text-lg max-w-4xl mx-auto px-4">
          Powerful text processing tools designed to make text formatting tasks easy and efficient.
        </p>
      </div>
    </div>
  );
}
