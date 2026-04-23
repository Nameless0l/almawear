import { NextRequest, NextResponse } from "next/server";
import { getSettings, saveSettings, type SiteSettings } from "@/lib/settings-data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function checkAuth(req: NextRequest): boolean {
  return req.headers.get("authorization") === `Bearer alma-admin-${process.env.ADMIN_PASSWORD}`;
}

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const body: SiteSettings = await req.json();
  const result = await saveSettings(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error ?? "Erreur de sauvegarde" }, { status: 500 });
  }
  return NextResponse.json({ success: true, url: result.url });
}
