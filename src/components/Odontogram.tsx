import React from "react";
import { teethPaths } from "../data";

export type Language = "en" | "fr";

export type ToothStatusType =
  | "healthy"
  | "filled"
  | "caries"
  | "crown"
  | "root_canal"
  | "implant"
  | "missing"
  | "planned";

export interface StatusConfig {
  id: ToothStatusType;
  labelEn: string;
  labelFr: string;
  fillColor: string;
  outlineColor: string;
  highlightColor: string;
  badge: string;
}

export const STATUS_CONFIGS: Record<ToothStatusType, StatusConfig> = {
  healthy: {
    id: "healthy",
    labelEn: "Normal",
    labelFr: "Sain",
    fillColor: "#0E101D",
    outlineColor: "#94A3B8",
    highlightColor: "#64748B",
    badge: "⚪",
  },
  filled: {
    id: "filled",
    labelEn: "Filled",
    labelFr: "Obturation",
    fillColor: "#4F67FF", // Matches previewdark.png blue
    outlineColor: "#BAC7FF",
    highlightColor: "#E0E7FF",
    badge: "🔵",
  },
  caries: {
    id: "caries",
    labelEn: "Caries",
    labelFr: "Carie",
    fillColor: "#EF4444",
    outlineColor: "#FCA5A5",
    highlightColor: "#FEE2E2",
    badge: "🔴",
  },
  crown: {
    id: "crown",
    labelEn: "Crown",
    labelFr: "Couronne",
    fillColor: "#F59E0B",
    outlineColor: "#FDE68A",
    highlightColor: "#FEF3C7",
    badge: "🟡",
  },
  root_canal: {
    id: "root_canal",
    labelEn: "Endo (RCT)",
    labelFr: "Dévitalisée",
    fillColor: "#10B981",
    outlineColor: "#A7F3D0",
    highlightColor: "#D1FAE5",
    badge: "🟢",
  },
  implant: {
    id: "implant",
    labelEn: "Implant",
    labelFr: "Implant",
    fillColor: "#06B6D4",
    outlineColor: "#A5F3FC",
    highlightColor: "#CFFAFE",
    badge: "🔷",
  },
  missing: {
    id: "missing",
    labelEn: "Missing",
    labelFr: "Absente",
    fillColor: "#1E293B",
    outlineColor: "#475569",
    highlightColor: "#334155",
    badge: "✖️",
  },
  planned: {
    id: "planned",
    labelEn: "To Treat",
    labelFr: "À soigner",
    fillColor: "#F97316",
    outlineColor: "#FED7AA",
    highlightColor: "#FFEDD5",
    badge: "🟠",
  },
};

export interface ToothMeta {
  id: string; // FDI
  universal: string;
  pathIndex: number;
  quadrant: 1 | 2 | 3 | 4;
  arch: "upper" | "lower";
  nameEn: string;
  nameFr: string;
}

// 32 Anatomical Teeth Definitions with English and French names
export const ALL_32_TEETH: ToothMeta[] = [
  // Upper Right (Viewer's Left - Quadrant 1)
  { id: "18", universal: "1",  pathIndex: 7, quadrant: 1, arch: "upper", nameEn: "Maxillary Right 3rd Molar (Wisdom)", nameFr: "3ème Molaire maxillaire droite (Sagesse)" },
  { id: "17", universal: "2",  pathIndex: 6, quadrant: 1, arch: "upper", nameEn: "Maxillary Right 2nd Molar", nameFr: "2ème Molaire maxillaire droite" },
  { id: "16", universal: "3",  pathIndex: 5, quadrant: 1, arch: "upper", nameEn: "Maxillary Right 1st Molar", nameFr: "1ère Molaire maxillaire droite" },
  { id: "15", universal: "4",  pathIndex: 4, quadrant: 1, arch: "upper", nameEn: "Maxillary Right 2nd Premolar", nameFr: "2ème Prémolaire maxillaire droite" },
  { id: "14", universal: "5",  pathIndex: 3, quadrant: 1, arch: "upper", nameEn: "Maxillary Right 1st Premolar", nameFr: "1ère Prémolaire maxillaire droite" },
  { id: "13", universal: "6",  pathIndex: 2, quadrant: 1, arch: "upper", nameEn: "Maxillary Right Canine", nameFr: "Canine maxillaire droite" },
  { id: "12", universal: "7",  pathIndex: 1, quadrant: 1, arch: "upper", nameEn: "Maxillary Right Lateral Incisor", nameFr: "Incisive latérale maxillaire droite" },
  { id: "11", universal: "8",  pathIndex: 0, quadrant: 1, arch: "upper", nameEn: "Maxillary Right Central Incisor", nameFr: "Incisive centrale maxillaire droite" },

  // Upper Left (Viewer's Right - Quadrant 2)
  { id: "21", universal: "9",  pathIndex: 0, quadrant: 2, arch: "upper", nameEn: "Maxillary Left Central Incisor", nameFr: "Incisive centrale maxillaire gauche" },
  { id: "22", universal: "10", pathIndex: 1, quadrant: 2, arch: "upper", nameEn: "Maxillary Left Lateral Incisor", nameFr: "Incisive latérale maxillaire gauche" },
  { id: "23", universal: "11", pathIndex: 2, quadrant: 2, arch: "upper", nameEn: "Maxillary Left Canine", nameFr: "Canine maxillaire gauche" },
  { id: "24", universal: "12", pathIndex: 3, quadrant: 2, arch: "upper", nameEn: "Maxillary Left 1st Premolar", nameFr: "1ère Prémolaire maxillaire gauche" },
  { id: "25", universal: "13", pathIndex: 4, quadrant: 2, arch: "upper", nameEn: "Maxillary Left 2nd Premolar", nameFr: "2ème Prémolaire maxillaire gauche" },
  { id: "26", universal: "14", pathIndex: 5, quadrant: 2, arch: "upper", nameEn: "Maxillary Left 1st Molar", nameFr: "1ère Molaire maxillaire gauche" },
  { id: "27", universal: "15", pathIndex: 6, quadrant: 2, arch: "upper", nameEn: "Maxillary Left 2nd Molar", nameFr: "2ème Molaire maxillaire gauche" },
  { id: "28", universal: "16", pathIndex: 7, quadrant: 2, arch: "upper", nameEn: "Maxillary Left 3rd Molar (Wisdom)", nameFr: "3ème Molaire maxillaire gauche (Sagesse)" },

  // Lower Left (Viewer's Right - Quadrant 3)
  { id: "31", universal: "24", pathIndex: 0, quadrant: 3, arch: "lower", nameEn: "Mandibular Left Central Incisor", nameFr: "Incisive centrale mandibulaire gauche" },
  { id: "32", universal: "23", pathIndex: 1, quadrant: 3, arch: "lower", nameEn: "Mandibular Left Lateral Incisor", nameFr: "Incisive latérale mandibulaire gauche" },
  { id: "33", universal: "22", pathIndex: 2, quadrant: 3, arch: "lower", nameEn: "Mandibular Left Canine", nameFr: "Canine mandibulaire gauche" },
  { id: "34", universal: "21", pathIndex: 3, quadrant: 3, arch: "lower", nameEn: "Mandibular Left 1st Premolar", nameFr: "1ère Prémolaire mandibulaire gauche" },
  { id: "35", universal: "20", pathIndex: 4, quadrant: 3, arch: "lower", nameEn: "Mandibular Left 2nd Premolar", nameFr: "2ème Prémolaire mandibulaire gauche" },
  { id: "36", universal: "19", pathIndex: 5, quadrant: 3, arch: "lower", nameEn: "Mandibular Left 1st Molar", nameFr: "1ère Molaire mandibulaire gauche" },
  { id: "37", universal: "18", pathIndex: 6, quadrant: 3, arch: "lower", nameEn: "Mandibular Left 2nd Molar", nameFr: "2ème Molaire mandibulaire gauche" },
  { id: "38", universal: "17", pathIndex: 7, quadrant: 3, arch: "lower", nameEn: "Mandibular Left 3rd Molar (Wisdom)", nameFr: "3ème Molaire mandibulaire gauche (Sagesse)" },

  // Lower Right (Viewer's Left - Quadrant 4)
  { id: "48", universal: "32", pathIndex: 7, quadrant: 4, arch: "lower", nameEn: "Mandibular Right 3rd Molar (Wisdom)", nameFr: "3ème Molaire mandibulaire droite (Sagesse)" },
  { id: "47", universal: "31", pathIndex: 6, quadrant: 4, arch: "lower", nameEn: "Mandibular Right 2nd Molar", nameFr: "2ème Molaire mandibulaire droite" },
  { id: "46", universal: "30", pathIndex: 5, quadrant: 4, arch: "lower", nameEn: "Mandibular Right 1st Molar", nameFr: "1ère Molaire mandibulaire droite" },
  { id: "45", universal: "29", pathIndex: 4, quadrant: 4, arch: "lower", nameEn: "Mandibular Right 2nd Premolar", nameFr: "2ème Prémolaire mandibulaire droite" },
  { id: "44", universal: "28", pathIndex: 3, quadrant: 4, arch: "lower", nameEn: "Mandibular Right 1st Premolar", nameFr: "1ère Prémolaire mandibulaire droite" },
  { id: "43", universal: "27", pathIndex: 2, quadrant: 4, arch: "lower", nameEn: "Mandibular Right Canine", nameFr: "Canine mandibulaire droite" },
  { id: "42", universal: "26", pathIndex: 1, quadrant: 4, arch: "lower", nameEn: "Mandibular Right Lateral Incisor", nameFr: "Incisive latérale mandibulaire droite" },
  { id: "41", universal: "25", pathIndex: 0, quadrant: 4, arch: "lower", nameEn: "Mandibular Right Central Incisor", nameFr: "Incisive centrale mandibulaire droite" },
];

export const TOOTH_MAP = ALL_32_TEETH.reduce((acc, t) => {
  acc[t.id] = t;
  return acc;
}, {} as Record<string, ToothMeta>);

interface OdontogramProps {
  toothStatuses: Record<string, ToothStatusType>;
  selectedTooth: string | null;
  onSelectTooth: (toothId: string) => void;
  notation?: "FDI" | "Universal";
  className?: string;
}

export const Odontogram: React.FC<OdontogramProps> = ({
  toothStatuses,
  selectedTooth,
  onSelectTooth,
  className = "",
}) => {
  // Render a single tooth within its quadrant
  const renderTooth = (meta: ToothMeta) => {
    const rawData = teethPaths[meta.pathIndex];
    if (!rawData) return null;

    const statusType = toothStatuses[meta.id] || "healthy";
    const statusCfg = STATUS_CONFIGS[statusType] || STATUS_CONFIGS.healthy;
    const isSelected = selectedTooth === meta.id;
    const isMissing = statusType === "missing";

    return (
      <g
        key={meta.id}
        id={`tooth-${meta.id}`}
        onClick={(e) => {
          e.stopPropagation();
          if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(10);
          }
          onSelectTooth(meta.id);
        }}
        className="cursor-pointer transition-transform duration-100 ease-out"
        style={{
          filter: isSelected
            ? "drop-shadow(0 0 6px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 10px rgba(79, 103, 255, 0.8))"
            : undefined,
          opacity: isMissing ? 0.35 : 1,
        }}
      >
        {/* Invisible enlarged hit target for effortless mobile touch */}
        <path
          d={rawData.outlinePath}
          fill="transparent"
          stroke="transparent"
          strokeWidth={14}
        />

        {/* Outline boundary */}
        <path
          d={rawData.outlinePath}
          stroke={isSelected ? "#FFFFFF" : statusCfg.outlineColor}
          strokeWidth={isSelected ? 2.6 : 1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Inner colored fill (shadowPath in original data) */}
        <path
          d={rawData.shadowPath}
          fill={statusCfg.fillColor}
          stroke={statusCfg.outlineColor}
          strokeWidth={0.6}
        />

        {/* Anatomical occlusal highlight fissures */}
        {Array.isArray(rawData.lineHighlightPath) ? (
          rawData.lineHighlightPath.map((d, i) => (
            <path
              key={i}
              d={d}
              stroke={isSelected ? "#FFFFFF" : statusCfg.highlightColor}
              strokeWidth={1.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          ))
        ) : (
          <path
            d={rawData.lineHighlightPath}
            stroke={isSelected ? "#FFFFFF" : statusCfg.highlightColor}
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        )}
      </g>
    );
  };

  const q1Teeth = ALL_32_TEETH.filter((t) => t.quadrant === 1);
  const q2Teeth = ALL_32_TEETH.filter((t) => t.quadrant === 2);
  const q3Teeth = ALL_32_TEETH.filter((t) => t.quadrant === 3);
  const q4Teeth = ALL_32_TEETH.filter((t) => t.quadrant === 4);

  return (
    <div className={`relative flex items-center justify-center select-none w-full h-full ${className}`}>
      <svg
        viewBox="0 0 408 700"
        className="w-full h-full max-h-[80vh] max-w-md mx-auto touch-manipulation drop-shadow-2xl"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="tooth-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Click to deselect */}
        <rect
          x="0"
          y="0"
          width="408"
          height="700"
          fill="transparent"
          onClick={() => onSelectTooth("")}
        />

        {/* ================= UPPER ARCH (MAXILLA) ================= */}
        <g id="upper-arch">
          {/* Quadrant 1: Upper Right (Patient's Right / Viewer's Left) */}
          <g id="quadrant-1">
            {q1Teeth.map(renderTooth)}
          </g>

          {/* Quadrant 2: Upper Left (Patient's Left / Viewer's Right - Mirrored) */}
          <g id="quadrant-2" transform="translate(408, 0) scale(-1, 1)">
            {q2Teeth.map(renderTooth)}
          </g>
        </g>

        {/* ================= LOWER ARCH (MANDIBLE) ================= */}
        <g id="lower-arch">
          {/* Quadrant 4: Lower Right (Patient's Right / Viewer's Left - Inverted Vertically) */}
          <g id="quadrant-4" transform="translate(0, 690) scale(1, -1)">
            {q4Teeth.map(renderTooth)}
          </g>

          {/* Quadrant 3: Lower Left (Patient's Left / Viewer's Right - Inverted & Mirrored) */}
          <g id="quadrant-3" transform="translate(408, 690) scale(-1, -1)">
            {q3Teeth.map(renderTooth)}
          </g>
        </g>
      </svg>
    </div>
  );
};
