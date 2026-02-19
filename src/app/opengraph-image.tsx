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
          position: "relative",
          backgroundColor: "#FAFAF8",
        }}
      >
        {/* Product image — right side */}
        <img
          src={base64Image}
          width={500}
          height={630}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 500,
            height: 630,
            objectFit: "cover",
          }}
        />

        {/* Gradient overlay on image */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 500,
            height: 630,
            background: "linear-gradient(to right, #FAFAF8 0%, rgba(250,250,248,0.3) 100%)",
          }}
        />

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

        {/* Content — left side */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 80,
            width: 750,
            height: "100%",
            gap: 20,
          }}
        >
          {/* Brand name */}
          <h1
            style={{
              fontSize: 64,
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
              height: 2,
              backgroundColor: "#C4A882",
            }}
          />

          {/* Tagline */}
          <p
            style={{
              fontSize: 30,
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

          {/* Location */}
          <p
            style={{
              fontSize: 16,
              color: "#C4A882",
              letterSpacing: "0.15em",
              margin: 0,
              marginTop: 20,
            }}
          >
            Douala, Cameroun
          </p>
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
