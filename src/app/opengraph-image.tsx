import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Alma Wear — Mode africaine contemporaine | Douala, Cameroun";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAFAF8",
          position: "relative",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            backgroundColor: "#C4A882",
          }}
        />

        {/* Logo area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
        >
          {/* Brand name */}
          <h1
            style={{
              fontSize: 72,
              fontWeight: 300,
              color: "#1A1714",
              letterSpacing: "0.15em",
              margin: 0,
            }}
          >
            ALMA WEAR
          </h1>

          {/* Decorative line */}
          <div
            style={{
              width: 60,
              height: 1,
              backgroundColor: "#C4A882",
            }}
          />

          {/* Tagline */}
          <p
            style={{
              fontSize: 28,
              fontWeight: 300,
              fontStyle: "italic",
              color: "#7A7570",
              margin: 0,
            }}
          >
            L&apos;élégance à l&apos;africaine
          </p>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 18,
              color: "#7A7570",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              margin: 0,
              marginTop: 10,
            }}
          >
            Kaftans • Boubous • Ensembles
          </p>
        </div>

        {/* Bottom info */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#7A7570",
            fontSize: 16,
            letterSpacing: "0.1em",
          }}
        >
          Douala, Cameroun
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            backgroundColor: "#C4A882",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
