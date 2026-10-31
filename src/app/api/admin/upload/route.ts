import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  const { data: { user } } = await supabase.auth.getUser();
  const admins = (process.env.ADMIN_USER_IDS || "").split(",").map((id) => id.trim()).filter(Boolean);
  if (!user || !admins.includes(user.id)) return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Choose an image file." }, { status: 400 });
  if (!file.type.startsWith("image/") || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) return NextResponse.json({ error: "Use a JPG, PNG, or WebP image." }, { status: 415 });
  if (file.size > 8 * 1024 * 1024) return NextResponse.json({ error: "Image must be 8 MB or smaller." }, { status: 413 });
  const extension = file.type === "image/jpeg" ? "jpg" : file.type === "image/png" ? "png" : "webp";
  const path = `${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from("portfolio-media").upload(path, file, { contentType: file.type, upsert: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  const { data } = supabase.storage.from("portfolio-media").getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
