import { createDecipheriv, createHash } from "crypto";
import { ENCRYPTION_KEY } from "@/config";
import { NextResponse } from "next/server";

export function decryptData(encryptedData: string) {
  const [ivHex, encryptedHex] = encryptedData.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");

  // Create a 32-byte key using SHA-256 hash of the original key
  const key = createHash("sha256").update(String(ENCRYPTION_KEY)).digest();

  const decipher = createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return JSON.parse(decrypted.toString());
}

export async function POST(request: Request) {
  const { encryptedData } = await request.json();

  const decryptedData = decryptData(encryptedData);

  return NextResponse.json(decryptedData);
}
