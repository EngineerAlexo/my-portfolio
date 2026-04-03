import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a, #0284c7)",
          color: "white",
          borderRadius: "18px",
          fontSize: 28,
          fontWeight: 700,
        }}
      >
        H
      </div>
    ),
    size,
  );
}
