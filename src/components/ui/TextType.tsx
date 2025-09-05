"use client";

import React, { useState, useEffect } from "react";
import "./TextType.css";

interface TextTypeProps {
  text: string[];
  typingSpeed?: number;
  pauseDuration?: number;
  showCursor?: boolean;
  cursorCharacter?: string;
  className?: string;
  textColors?: string[];
  loop?: boolean;
}

const TextType: React.FC<TextTypeProps> = ({
  text,
  typingSpeed = 100,
  pauseDuration = 2000,
  showCursor = true,
  cursorCharacter = "|",
  className = "",
  textColors = ["#000"],
  loop = true,
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursorState, setShowCursorState] = useState(true);

  useEffect(() => {
    const fullText = text[currentTextIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (currentText.length < fullText.length) {
            setCurrentText(fullText.substring(0, currentText.length + 1));
          } else {
            // Finished typing current text, pause then start deleting
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(fullText.substring(0, currentText.length - 1));
          } else {
            // Finished deleting, move to next text
            setIsDeleting(false);
            if (loop || currentTextIndex < text.length - 1) {
              setCurrentTextIndex((prev) => (prev + 1) % text.length);
            }
          }
        }
      },
      isDeleting ? typingSpeed / 2 : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    currentTextIndex,
    isDeleting,
    text,
    typingSpeed,
    pauseDuration,
    loop,
  ]);

  // Cursor blinking effect
  useEffect(() => {
    if (showCursor) {
      const cursorInterval = setInterval(() => {
        setShowCursorState((prev) => !prev);
      }, 500);

      return () => clearInterval(cursorInterval);
    }
  }, [showCursor]);

  const currentColor =
    textColors[currentTextIndex % textColors.length] || "#000";

  return (
    <div className={`text-type ${className}`} style={{ color: currentColor }}>
      <span>{currentText}</span>
      {showCursor && (
        <span
          className={`text-type__cursor ${
            showCursorState ? "visible" : "hidden"
          }`}
          style={{ color: currentColor }}>
          {cursorCharacter}
        </span>
      )}
    </div>
  );
};

export default TextType;
