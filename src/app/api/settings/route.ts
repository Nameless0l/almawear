import { NextRequest, NextResponse } from "next/server";
import { getSettings, saveSettings, type SiteSettings } from "@/lib/settings-data";

function checkAuth(req: NextRequest): boolean {
  return req.headers.get("authorization") === `Bearer alma-admin-${process.env.ADMIN_PASSWORD}`;
}

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const body: SiteSettings = await req.json();
  const ok = await saveSettings(body);
  if (!ok) return NextResponse.json({ error: "Erreur de sauvegarde" }, { status: 500 });
  return NextResponse.json({ success: true });
}
