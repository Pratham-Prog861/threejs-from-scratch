import { useState } from "react";

function EffectsToggle({ onToggle }) {
  const [enabled, setEnabled] = useState(true);

  const handleToggle = () => {
    const newState = !enabled;
    setEnabled(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        left: "20px",
        zIndex: 100,
      }}
    >
      <button
        onClick={handleToggle}
        style={{
          padding: "12px 24px",
          background: enabled ? "#00ffff" : "#333",
          color: enabled ? "#000" : "#fff",
          border: "none",
          borderRadius: "30px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "14px",
          boxShadow: enabled ? "0 0 20px rgba(0, 255, 255, 0.5)" : "none",
          transition: "all 0.3s ease",
          fontFamily: "monospace",
        }}
      >
        {enabled ? "✨ EFFECTS ON" : "🌑 EFFECTS OFF"}
      </button>
    </div>
  );
}

export default EffectsToggle;
