"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
// @ts-ignore
import qrcode from "@/lib/qrcode"; // Import local library
import { useTranslations } from "next-intl";

export default function QRCodeWorkspace() {
    const t = useTranslations("qrGenerator");
    const [text, setText] = useState("");
    const [qrStyle, setQrStyle] = useState<"squares" | "dots" | "fluid">("squares");
    const [qrColor, setQrColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#ffffff");
    const [showQr, setShowQr] = useState(false);

    const qrRef = useRef<SVGSVGElement>(null);

    const handleGenerate = () => {
        if (text.trim()) {
            setShowQr(true);
        }
    };

    const handleDownload = () => {
        if (!qrRef.current) return;

        const svgData = new XMLSerializer().serializeToString(qrRef.current);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            if (ctx) {
                ctx.fillStyle = bgColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
                const pngFile = canvas.toDataURL("image/png");

                const downloadLink = document.createElement("a");
                downloadLink.download = "qrcode.png";
                downloadLink.href = pngFile;
                downloadLink.click();
            }
        };

        img.src = "data:image/svg+xml;base64," + btoa(svgData);
    };

    const styles = [
        { id: "squares", label: "Classic" },
        { id: "fluid", label: "Rounded" },
        { id: "dots", label: "Dots" },
    ];

    // Generate QR Matrix
    const qrData = useMemo(() => {
        if (!text) return null;
        try {
            const typeNumber = 0; // Auto detection
            const errorCorrectionLevel = 'H';
            // @ts-ignore
            const qr = new qrcode(typeNumber, errorCorrectionLevel);
            qr.addData(text);
            qr.make();
            const count = qr.getModuleCount();
            const modules = [];
            for (let r = 0; r < count; r++) {
                const row = [];
                for (let c = 0; c < count; c++) {
                    row.push(qr.isDark(r, c));
                }
                modules.push(row);
            }
            return { modules, count };
        } catch (e) {
            console.error(e);
            return null;
        }
    }, [text, showQr]); // Re-generate when text changes or show button clicked (though logical to just depend on text, use showQr to trigger display)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
            {/* Settings Card */}
            <div className="bg-black border-2 border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                <div className="p-4 border-b-2 border-pink-500/30 flex items-center gap-2 bg-gray-900/50">
                    <span className="text-xl">⚙️</span>
                    <h2 className="font-bold text-rose-400 text-lg uppercase tracking-wider">Configuration</h2>
                </div>

                <div className="p-6 space-y-6">
                    {/* Input Section */}
                    <div className="space-y-2">
                        <label className="font-bold text-rose-400 uppercase text-xs tracking-wider">Content Source</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="ENTER URL OR TEXT HERE..."
                            className="w-full h-32 p-4 bg-black border-2 border-pink-500 text-rose-400 placeholder-pink-900/60 resize-none focus:outline-none focus:placeholder-pink-700/50 focus:shadow-[0_0_10px_rgba(236,72,153,0.2)] transition-all font-mono text-sm"
                        />
                    </div>

                    {/* Style Selection */}
                    <div className="space-y-2">
                        <label className="font-bold text-rose-400 uppercase text-xs tracking-wider">Pattern Style</label>
                        <div className="flex bg-black gap-0 border-2 border-pink-500 p-1">
                            {styles.map((style) => (
                                <button
                                    key={style.id}
                                    onClick={() => setQrStyle(style.id as any)}
                                    className={`flex-1 py-3 font-bold uppercase text-xs tracking-wide transition-all ${qrStyle === style.id
                                            ? "bg-pink-500 text-black shadow-lg"
                                            : "text-pink-700 hover:text-pink-400 hover:bg-pink-900/20"
                                        }`}
                                >
                                    {style.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Colors */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="font-bold text-rose-400 uppercase text-xs tracking-wider">Foreground</label>
                            <div className="flex items-center gap-3 border-2 border-pink-500 px-3 py-2 bg-black hover:bg-gray-900 transition-colors">
                                <input
                                    type="color"
                                    value={qrColor}
                                    onChange={(e) => setQrColor(e.target.value)}
                                    className="w-8 h-8 cursor-pointer border-none bg-transparent p-0"
                                />
                                <span className="text-rose-400 font-mono text-xs">{qrColor}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="font-bold text-rose-400 uppercase text-xs tracking-wider">Background</label>
                            <div className="flex items-center gap-3 border-2 border-pink-500 px-3 py-2 bg-black hover:bg-gray-900 transition-colors">
                                <input
                                    type="color"
                                    value={bgColor}
                                    onChange={(e) => setBgColor(e.target.value)}
                                    className="w-8 h-8 cursor-pointer border-none bg-transparent p-0"
                                />
                                <span className="text-rose-400 font-mono text-xs">{bgColor}</span>
                            </div>
                        </div>
                    </div>

                    {/* Generate Button */}
                    <button
                        onClick={handleGenerate}
                        className="w-full py-5 font-bold uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2 mt-6 border-2 bg-black text-rose-400 border-pink-500 hover:bg-pink-500 hover:text-black hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] cursor-pointer"
                    >
                        <span>⚡</span>
                        Generate QR Code
                        <span>➜</span>
                    </button>
                </div>
            </div>

            {/* Preview Card */}
            <div className="bg-black border-2 border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.3)] flex flex-col h-full">
                <div className="p-4 border-b-2 border-pink-500/30 flex items-center gap-2 bg-gray-900/50">
                    <span className="text-xl">👁️</span>
                    <h2 className="font-bold text-rose-400 text-lg uppercase tracking-wider">Live Preview</h2>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-[400px] relative overflow-hidden">
                    {/* Grid Background Effect */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{ backgroundImage: 'linear-gradient(#ec4899 1px, transparent 1px), linear-gradient(90deg, #ec4899 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                    </div>

                    {showQr && qrData ? (
                        <div className="space-y-8 text-center animate-fade-in relative z-10 w-full flex flex-col items-center">
                            <div className="p-4 bg-white border-4 border-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.3)] inline-block transition-transform hover:scale-105 duration-300">
                                <svg
                                    ref={qrRef}
                                    width={250}
                                    height={250}
                                    viewBox={`0 0 ${qrData.count} ${qrData.count}`}
                                    style={{ backgroundColor: bgColor }}
                                >
                                    <rect width="100%" height="100%" fill={bgColor} />
                                    {qrData.modules.map((row, r) =>
                                        row.map((isDark, c) => {
                                            if (!isDark) return null;
                                            if (qrStyle === 'dots') {
                                                return (
                                                    <circle
                                                        key={`${r}-${c}`}
                                                        cx={c + 0.5}
                                                        cy={r + 0.5}
                                                        r={0.4}
                                                        fill={qrColor}
                                                    />
                                                );
                                            } else if (qrStyle === 'fluid') {
                                                return (
                                                    <rect
                                                        key={`${r}-${c}`}
                                                        x={c + 0.1}
                                                        y={r + 0.1}
                                                        width={0.8}
                                                        height={0.8}
                                                        rx={0.3}
                                                        fill={qrColor}
                                                    />
                                                );
                                            } else {
                                                return (
                                                    <rect
                                                        key={`${r}-${c}`}
                                                        x={c}
                                                        y={r}
                                                        width={1}
                                                        height={1}
                                                        fill={qrColor}
                                                    />
                                                );
                                            }
                                        })
                                    )}
                                </svg>
                            </div>

                            <div className="flex gap-3 justify-center w-full">
                                <button
                                    onClick={handleDownload}
                                    className="w-full max-w-xs py-4 bg-black border-2 border-pink-500 text-rose-400 hover:bg-pink-500 hover:text-black transition-all flex items-center justify-center gap-2 font-bold uppercase tracking-wide hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]"
                                >
                                    <span>💾</span> Download PNG
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-pink-900/50 space-y-4 relative z-10">
                            <div className="text-7xl animate-pulse">📲</div>
                            <p className="font-bold text-rose-400 uppercase tracking-widest text-sm">Awaiting Input</p>
                            <p className="text-xs text-pink-700/70 font-mono">Use the configuration panel to generate</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
