import ReportTypeGrid from "./reports/ReportTypeGrid"
import RecentSubmissionsList from "./reports/RecentSubmissionsList"
import ReportFormScreen from "./ReportFormScreen"
import ReportDetailScreen from "./ReportDetailScreen"
import { useState } from "react"

interface Props {
  onBack: () => void
}


export default function ReportsScreen({ onBack }: Props) {
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [composeType, setComposeType] = useState<string | null>(null)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        paddingTop: "4px",
        paddingBottom: "104px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "8px 16px 4px",
        }}
      >
        <button
          onClick={onBack}
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "12px",
            flexShrink: 0,
            border: "1px solid rgba(180,200,255,0.14)",
            background: "rgba(255,255,255,0.05)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path
              d="M8.5 15.5L1.5 8.5L8.5 1.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div style={{ flex: 1, textAlign: "center" }}>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 800,
              fontSize: "15px",
              color: "#FFFFFF",
              letterSpacing: "0.3px",
              lineHeight: 1.2,
            }}
          >
            FIELD REPORTING HUB
          </div>
          <div
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "9px",
              color: "rgba(130,155,200,0.5)",
              letterSpacing: "2px",
              marginTop: "3px",
            }}
          >
            SECURE DIGITAL DOCUMENTATION
          </div>
        </div>

        <div style={{ width: "38px", flexShrink: 0 }} />
      </div>

      {/* 2×2 report type grid */}
      <ReportTypeGrid onSelect={setComposeType} />

      {/* Recent submissions feed */}
      <RecentSubmissionsList onSelect={setSelectedReport} />
      {
        composeType && (
          <ReportFormScreen
            type={composeType}
            onBack={() => setComposeType(null)}
          />
        )
      }

      {
        selectedReport && (
          <ReportDetailScreen
            reportId={selectedReport}
            onBack={() => setSelectedReport(null)}
          />
        )
      }
    </div >
  )
}
