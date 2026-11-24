import { useState, useEffect } from "react";
import { 
  Odontogram, 
  STATUS_CONFIGS, 
  TOOTH_MAP, 
  ALL_32_TEETH, 
  type ToothStatusType,
  type Language
} from "./components/Odontogram";

const STORAGE_CHART_KEY = "doctor_odontogram_chart_v2";
const STORAGE_LANG_KEY = "doctor_odontogram_lang";

// Initial state mirroring previewdark.png (Tooth 21, 15, and 26 filled in blue)
const INITIAL_STATUSES: Record<string, ToothStatusType> = {
  "21": "filled",
  "15": "filled",
  "26": "filled",
};

const I18N = {
  en: {
    title: "Odontogram",
    allNormal: "All normal",
    markedTeeth: (n: number) => `${n} marked teeth`,
    resetBtn: "Reset",
    resetConfirm: "Reset all teeth status to normal?",
    toothPrefix: "Tooth",
    tapHelp: "👉 Tap any tooth above to view or change its status",
    prevTooth: "Previous tooth",
    nextTooth: "Next tooth",
  },
  fr: {
    title: "Odontogramme",
    allNormal: "Dentition saine",
    markedTeeth: (n: number) => `${n} dents marquées`,
    resetBtn: "Effacer",
    resetConfirm: "Réinitialiser l'état de toutes les dents ?",
    toothPrefix: "Dent",
    tapHelp: "👉 Touchez une dent ci-dessus pour modifier son état",
    prevTooth: "Dent précédente",
    nextTooth: "Dent suivante",
  },
};

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_LANG_KEY);
      if (savedLang === "en" || savedLang === "fr") return savedLang;
      if (typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("fr")) {
        return "fr";
      }
    } catch {
      // fallback
    }
    return "en";
  });

  const [statuses, setStatuses] = useState<Record<string, ToothStatusType>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CHART_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_STATUSES;
  });

  const [selectedToothId, setSelectedToothId] = useState<string | null>("21");
  const [notation, setNotation] = useState<"FDI" | "Universal">("FDI");
  const [activePaintTool, setActivePaintTool] = useState<ToothStatusType | null>(null);

  const t = I18N[lang];

  // Auto-save chart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CHART_KEY, JSON.stringify(statuses));
    } catch {
      // ignore
    }
  }, [statuses]);

  // Auto-save language choice
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_LANG_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang]);

  // When doctor clicks a tooth
  const handleSelectTooth = (toothId: string) => {
    if (!toothId) {
      setSelectedToothId(null);
      return;
    }

    // If an active paint tool is chosen, apply it directly to the clicked tooth
    if (activePaintTool) {
      setStatuses((prev) => ({
        ...prev,
        [toothId]: activePaintTool,
      }));
      setSelectedToothId(toothId);
      return;
    }

    // Otherwise, select the tooth so doctor can inspect or swap its status
    setSelectedToothId(toothId);
  };

  // When doctor taps a status chip in the bottom dock
  const handleSwapStatus = (status: ToothStatusType) => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(12);
    }

    if (selectedToothId) {
      setStatuses((prev) => ({
        ...prev,
        [selectedToothId]: status,
      }));
    } else {
      // If no tooth is currently selected, set this status as active paint tool
      setActivePaintTool(status === activePaintTool ? null : status);
    }
  };

  // Step to adjacent tooth (Previous / Next)
  const handleStepTooth = (direction: -1 | 1) => {
    if (!selectedToothId) {
      setSelectedToothId("11");
      return;
    }
    const currentIndex = ALL_32_TEETH.findIndex((t) => t.id === selectedToothId);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + direction + ALL_32_TEETH.length) % ALL_32_TEETH.length;
    setSelectedToothId(ALL_32_TEETH[nextIndex].id);
  };

  // Reset all teeth to healthy
  const handleReset = () => {
    if (window.confirm(t.resetConfirm)) {
      setStatuses({});
      setSelectedToothId(null);
      setActivePaintTool(null);
    }
  };

  const selectedMeta = selectedToothId ? TOOTH_MAP[selectedToothId] : null;
  const currentStatus = selectedToothId ? statuses[selectedToothId] || "healthy" : null;

  // Counts of conditions for quick indicator
  const statusCounts = Object.values(statuses).reduce((acc, s) => {
    if (s && s !== "healthy") {
      acc[s] = (acc[s] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const nonHealthyCount = Object.keys(statusCounts).reduce((sum, k) => sum + statusCounts[k], 0);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#0B0C13] text-slate-100 font-sans select-none touch-manipulation">
      {/* Top Header Bar */}
      <header className="flex items-center justify-between px-3 py-2 bg-[#0E101D] border-b border-slate-800/80 shrink-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-sm">
            🦷
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold text-slate-100 tracking-wide leading-tight">
              {t.title}
            </h1>
            <p className="text-[10px] text-slate-400">
              {nonHealthyCount > 0 ? t.markedTeeth(nonHealthyCount) : t.allNormal}
            </p>
          </div>
        </div>

        {/* Action Controls: Language, Notation & Reset */}
        <div className="flex items-center gap-1.5">
          {/* Language Switcher (EN / FR) */}
          <div className="flex items-center bg-[#161828] p-0.5 rounded-lg border border-slate-800 text-[11px] font-semibold">
            <button
              onClick={() => setLang("en")}
              className={`px-1.5 py-0.5 rounded-md transition-all ${
                lang === "en"
                  ? "bg-indigo-600 text-white shadow-xs font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => setLang("fr")}
              className={`px-1.5 py-0.5 rounded-md transition-all ${
                lang === "fr"
                  ? "bg-indigo-600 text-white shadow-xs font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Français"
            >
              FR
            </button>
          </div>

          {/* Notation Toggle (FDI / Univ) */}
          <div className="flex items-center bg-[#161828] p-0.5 rounded-lg border border-slate-800 text-[11px] font-semibold">
            <button
              onClick={() => setNotation("FDI")}
              className={`px-2 py-0.5 rounded-md transition-all ${
                notation === "FDI"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              FDI
            </button>
            <button
              onClick={() => setNotation("Universal")}
              className={`px-2 py-0.5 rounded-md transition-all ${
                notation === "Universal"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Univ
            </button>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="text-[11px] px-2 py-1 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 rounded-lg border border-slate-700/60 transition-colors"
            title={t.resetBtn}
          >
            {t.resetBtn}
          </button>
        </div>
      </header>

      {/* Main Dental Arch Display */}
      <main className="flex-1 relative flex items-center justify-center p-2 overflow-hidden">
        <Odontogram
          toothStatuses={statuses}
          selectedTooth={selectedToothId}
          onSelectTooth={handleSelectTooth}
          notation={notation}
        />
      </main>

      {/* Doctor's Bottom Status Bar & Quick Swapper */}
      <footer className="bg-[#0E101D] border-t border-slate-800/90 px-3 py-2.5 shrink-0 z-20 flex flex-col gap-2 shadow-2xl">
        {/* Selected Tooth Info & Navigator */}
        <div className="flex items-center justify-between text-xs">
          {selectedMeta ? (
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-extrabold text-sm text-indigo-400 shrink-0">
                {t.toothPrefix} {notation === "Universal" ? selectedMeta.universal : selectedMeta.id}
              </span>
              <span className="text-[11px] text-slate-300 truncate">
                {lang === "fr" ? selectedMeta.nameFr : selectedMeta.nameEn}
              </span>
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0"
                style={{
                  backgroundColor: `${STATUS_CONFIGS[currentStatus || "healthy"].fillColor}33`,
                  borderColor: STATUS_CONFIGS[currentStatus || "healthy"].outlineColor,
                  color: STATUS_CONFIGS[currentStatus || "healthy"].outlineColor,
                }}
              >
                {STATUS_CONFIGS[currentStatus || "healthy"].badge}{" "}
                {lang === "fr"
                  ? STATUS_CONFIGS[currentStatus || "healthy"].labelFr
                  : STATUS_CONFIGS[currentStatus || "healthy"].labelEn}
              </span>
            </div>
          ) : (
            <div className="text-slate-400 text-xs truncate">
              {t.tapHelp}
            </div>
          )}

          {/* Step buttons for rapid chairside examination */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => handleStepTooth(-1)}
              className="px-2 py-1 rounded bg-[#161828] hover:bg-slate-800 text-slate-300 text-xs border border-slate-700/60 transition-colors"
              title={t.prevTooth}
            >
              ◀
            </button>
            <button
              onClick={() => handleStepTooth(1)}
              className="px-2 py-1 rounded bg-[#161828] hover:bg-slate-800 text-slate-300 text-xs border border-slate-700/60 transition-colors"
              title={t.nextTooth}
            >
              ▶
            </button>
          </div>
        </div>

        {/* 1-Tap Status Swapper Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
          {(Object.keys(STATUS_CONFIGS) as ToothStatusType[]).map((statusKey) => {
            const config = STATUS_CONFIGS[statusKey];
            const isCurrent = currentStatus === statusKey;
            const isPaintActive = activePaintTool === statusKey;
            const label = lang === "fr" ? config.labelFr : config.labelEn;

            return (
              <button
                key={statusKey}
                onClick={() => handleSwapStatus(statusKey)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                  isCurrent || isPaintActive
                    ? "ring-2 ring-indigo-400 font-bold scale-102 shadow-md"
                    : "hover:border-slate-500"
                }`}
                style={{
                  backgroundColor: isCurrent ? `${config.fillColor}dd` : "#161828",
                  borderColor: isCurrent ? config.outlineColor : "#2A2D3D",
                  color: isCurrent ? "#FFFFFF" : "#CBD5E1",
                }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0 border"
                  style={{
                    backgroundColor: config.fillColor,
                    borderColor: config.outlineColor,
                  }}
                />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </footer>
    </div>
  );
}
