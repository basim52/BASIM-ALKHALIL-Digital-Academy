import React, { useEffect, useState } from "react";
import "./tutorBoard.css";
import { BOARD_PERSONAS } from "../../data/saraBoardPersonas";
import { TutorVideoFace } from "./TutorVideoFace";

// Video-only tutor face (3D model + photo/3D toggle removed). Fallback: still portrait inside the gold ring.
type Agent = { id: string; gender: "male" | "female"; nameAr: string; nameEn: string };
const AGENTS: Agent[] = BOARD_PERSONAS.map(p => ({ id: p.id, gender: p.gender, nameAr: p.nameAr, nameEn: p.nameEn }));

export interface Tutor3DAvatarProps {
  agentId: string;
  isArabic: boolean;
  isSpeaking: boolean;
  isListening?: boolean;
  isThinking?: boolean;
  compact?: boolean;
  mode?: "showcase" | "docked" | "floating";
  onToggleFloating?: () => void;
  onTriggerVoicePreview?: () => void;
}

export const Tutor3DAvatar: React.FC<Tutor3DAvatarProps> = ({
  agentId, isArabic, isSpeaking, isListening = false, isThinking = false, compact = false, mode = "docked", onToggleFloating, onTriggerVoicePreview,
}) => {
  const [videoFailed, setVideoFailed] = useState(false);
  useEffect(() => setVideoFailed(false), [agentId]);
  useEffect(() => { try { localStorage.removeItem("tutorAvatarView"); } catch {} }, []);
  const agent: Agent = AGENTS.find((a) => a.id === agentId) || AGENTS[0];
  const alt = isArabic ? agent.nameAr : agent.nameEn;

  return (
    <div className={`tutor-3d-stage-card ${mode} ${isSpeaking ? "is-speaking" : ""} ${isListening ? "is-listening" : ""}`}>
      {/* Top Status & Camera Controls */}
      <div className="tutor-3d-stage-header">
        <div className="tutor-3d-badge">
          <span className="pulse-dot-3d" />
          <span>
            {isSpeaking
              ? isArabic
                ? `🔊 ${agent.nameAr} ${agent.gender === "female" ? "تتحدث" : "يتحدث"} الآن`
                : `🔊 ${agent.nameEn} is speaking`
              : isListening
              ? isArabic
                ? "🎙️ يستمع إليك بانتباه..."
                : "🎙️ Listening attentively..."
              : isThinking
              ? isArabic
                ? "⚡ يحلل السبورة بـ Gemini 4..."
                : "⚡ Analyzing via Gemini 4..."
              : isArabic
              ? `${agent.gender === "female" ? "المعلمة" : "المعلم"} ${agent.nameAr}`
              : `Teacher ${agent.nameEn}`}
          </span>
        </div>

        <div className="tutor-3d-header-actions">
          {onToggleFloating && (
            <button
              type="button"
              onClick={onToggleFloating}
              className="tutor-3d-mini-btn highlight"
              title={
                mode === "floating"
                  ? isArabic
                    ? "تثبيت المعلم في القائمة الجانبية"
                    : "Dock avatar"
                  : isArabic
                  ? "إظهار المعلم فوق السبورة"
                  : "Pop-out avatar"
              }
            >
              {mode === "floating"
                ? isArabic
                  ? "📌 تثبيت"
                  : "📌 Dock"
                : isArabic
                ? "✨ انبثاق"
                : "✨ Pop-out"}
            </button>
          )}
        </div>
      </div>

      <div className={`tutor-3d-canvas-mount tutor-photo-mount ${compact ? "compact" : ""}`} data-no-i18n>
        <div className="tutor-photo">
          <div className="tutor-photo-glow" />
          <div className="tutor-photo-head">
            {!videoFailed ? (
              <TutorVideoFace id={agent.id} alt={alt} isSpeaking={isSpeaking} onFail={() => setVideoFailed(true)} />
            ) : (
              <img className="tutor-video-poster" src={`/tutors/${agent.id}.webp`} alt={alt} draggable={false} />
            )}
          </div>
        </div>
      </div>

      {onTriggerVoicePreview && <div className="tutor-3d-controls-bar">
        {onTriggerVoicePreview && (
          <button
            type="button"
            onClick={onTriggerVoicePreview}
            className={`tutor-3d-gesture-btn voice-btn ${isSpeaking ? "speaking" : ""}`}
          >
            🎙️ {isArabic ? "نطق مباشر" : "Speak"}
          </button>
        )}
      </div>}
    </div>
  );
};
