interface Props {
  value: string
  onChange: (v: string) => void
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(180,200,255,0.12)",
        borderRadius: "12px",
        padding: "13px 16px",
        transition: "border-color 0.2s ease",
      }}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        style={{ flexShrink: 0 }}
      >
        <circle
          cx="6.5"
          cy="6.5"
          r="5"
          stroke="rgba(180,200,255,0.45)"
          strokeWidth="1.4"
        />
        <line
          x1="10.5"
          y1="10.5"
          x2="14"
          y2="14"
          stroke="rgba(180,200,255,0.45)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
      <input
        type="text"
        placeholder="Search SOPs, post orders..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          flex: 1,
          background: "none",
          border: "none",
          outline: "none",
          fontFamily: "Space Grotesk, sans-serif",
          fontSize: "13px",
          fontWeight: 400,
          color: "#FFFFFF",
          caretColor: "#4DD9E8",
        }}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <line
              x1="2"
              y1="2"
              x2="12"
              y2="12"
              stroke="rgba(180,200,255,0.4)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="12"
              y1="2"
              x2="2"
              y2="12"
              stroke="rgba(180,200,255,0.4)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  )
}
