import { ImageResponse } from "next/og";

import { siteConfig } from "@/data/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          background:
            "radial-gradient(circle at top left, rgba(56,189,248,0.4), transparent 35%), linear-gradient(135deg, #020617, #0f172a 60%, #082f49)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, textTransform: "uppercase", color: "#7dd3fc" }}>
          {siteConfig.role}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 74, fontWeight: 700 }}>{siteConfig.fullName}</div>
          <div style={{ fontSize: 34, lineHeight: 1.4, maxWidth: "80%", color: "#cbd5e1" }}>
            Modern portfolio with projects, Firebase-powered content, markdown blogging, and polished UX.
          </div>
        </div>
        <div style={{ fontSize: 28, color: "#e2e8f0" }}>Next.js · TypeScript · Tailwind CSS · Firebase</div>
      </div>
    ),
    size,
  );
}
