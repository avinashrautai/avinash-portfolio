"use client";

import { useState } from "react";

export function ProjectImageField({ initialUrl = "" }: { initialUrl?: string | null }) {
  const [url, setUrl] = useState(initialUrl || "");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function upload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]; if (!file) return;
    setBusy(true); setMessage("Uploading…");
    const body = new FormData(); body.set("file", file);
    try {
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Upload failed");
      setUrl(result.url); setMessage("Uploaded. Save this project to attach the image.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Upload failed"); }
    finally { setBusy(false); }
  }
  return <div className="wide admin-form"><label>Project image URL<input name="image_url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Optional image URL" /></label><label>Upload image (optional)<input type="file" accept="image/png,image/jpeg,image/webp" onChange={upload} disabled={busy} /></label>{message && <p className="admin-note wide" role="status">{message}</p>}</div>;
}
