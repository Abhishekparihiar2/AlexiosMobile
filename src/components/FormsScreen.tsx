import { useState } from "react"
import ReportFormScreen from "./ReportFormScreen"

interface Props {
    onBack: () => void
}

const FORMS_LIST = [
    { id: "dar", title: "Daily Activity Report", subtitle: "Standard End-of-Shift Log", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15M9 11l3 3L22 4" },
    { id: "maintenance", title: "Maintenance Request", subtitle: "Report Physical Damages", icon: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" },
    { id: "visitor", title: "Visitor Registration", subtitle: "Guest Entry & Logs", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87" },
    { id: "vehicle", title: "Vehicle Inspection", subtitle: "Fleet & Patrol Checks", icon: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3 3 0 0 0 2 12v4c0 .6.4 1 1 1h2 M7 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M17 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
]

export default function FormsScreen({ onBack }: Props) {
    const [selectedForm, setSelectedForm] = useState<string | null>(null)

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
                        border: "1px solid rgba(180,200,255,0.14)",
                        background: "rgba(255,255,255,0.05)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                    }}
                >
                    <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
                        <path d="M8.5 15.5L1.5 8.5L8.5 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                        STANDARD FORMS
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
                        OPERATIONAL TEMPLATES
                    </div>
                </div>
                <div style={{ width: "38px", flexShrink: 0 }} />
            </div>

            <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                {FORMS_LIST.map((form) => (
                    <div
                        key={form.id}
                        onClick={() => setSelectedForm(form.title)}
                        style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.05)",
                            borderRadius: "16px",
                            padding: "16px",
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            cursor: "pointer",
                        }}
                    >
                        <div
                            style={{
                                width: "48px",
                                height: "48px",
                                borderRadius: "12px",
                                background: "rgba(77,217,232,0.1)",
                                border: "1px solid rgba(77,217,232,0.2)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4DD9E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d={form.icon} />
                            </svg>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ color: "var(--text-white)", fontSize: "15px", fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}>
                                {form.title}
                            </div>
                            <div style={{ color: "rgba(200,215,255,0.6)", fontSize: "12px", fontFamily: "Inter, sans-serif", marginTop: "2px" }}>
                                {form.subtitle}
                            </div>
                        </div>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </div>
                ))}
            </div>

            {selectedForm && (
                <ReportFormScreen
                    type={selectedForm}
                    onBack={() => setSelectedForm(null)}
                />
            )}
        </div>
    )
}
