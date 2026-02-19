import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "Alma Wear — Mode africaine contemporaine | Douala, Cameroun";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const imageData = await readFile(
    join(process.cwd(), "public/images/products/kaftan-blanc-gris-1.png")
  );
  const base64Image = `data:image/png;base64,${imageData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          backgroundColor: "#FAFAF8",
        }}
      >
        {/* Product image — top, large */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: 400,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={base64Image}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
            }}
          />
          {/* Gradient fade to bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 120,
              background: "linear-gradient(to bottom, rgba(250,250,248,0) 0%, #FAFAF8 100%)",
            }}
          />
        </div>

        {/* Text — bottom */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            gap: 10,
            paddingBottom: 20,
          }}
        >
          <h1
            style={{
              fontSize: 52,
              fontWeight: 300,
              color: "#1A1714",
              letterSpacing: "0.15em",
              margin: 0,
            }}
          >
            ALMA WEAR
          </h1>

          <div
            style={{
              width: 50,
              height: 2,
              backgroundColor: "#C4A882",
            }}
          />

          <p
            style={{
              fontSize: 22,
              fontWeight: 300,
              fontStyle: "italic",
              color: "#7A7570",
              margin: 0,
            }}
          >
            L&apos;élégance à l&apos;africaine
          </p>

          <p
            style={{
              fontSize: 14,
              color: "#C4A882",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              margin: 0,
              marginTop: 5,
            }}
          >
            Kaftans • Boubous • Ensembles — Douala, Cameroun
          </p>
        </div>

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            backgroundColor: "#C4A882",
          }}
        />

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 5,
            backgroundColor: "#C4A882",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
