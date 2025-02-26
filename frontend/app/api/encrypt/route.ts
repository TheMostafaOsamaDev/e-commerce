// app/api/encrypt/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createCipheriv, randomBytes, createHash } from "crypto";
import { ENCRYPTION_KEY } from "@/config";

export const encryptData = (data: string) => {
  // Create a 32-byte key using SHA-256 hash of the original key
  const key = createHash("sha256").update(String(ENCRYPTION_KEY)).digest();
  const iv = randomBytes(16);
  const cipher = createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
};

export async function POST(request: NextRequest) {
  const data = await request.json();
  const encryptedData = encryptData(JSON.stringify(data));

  return NextResponse.json({ encryptedData });
}
